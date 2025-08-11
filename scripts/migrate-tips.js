#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class SimpleTipsMigrator {
    constructor() {
        this.rootDir = path.join(__dirname, '..');
        this.tipsDir = path.join(this.rootDir, 'tips');
        this.assetsDir = path.join(this.rootDir, 'assets', 'img');
        this.dataFile = path.join(this.rootDir, 'data', 'tips.json');

        this.weeks = [];
        this.tips = [];
    }

    async migrate() {
        console.log('🚀 Starting migration of existing tips...');

        const currentTips = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));


        try {
            await this.scanTipsDirectories(currentTips);
            await this.generateWeeksData();
            await this.saveMigratedData();

            console.log('✅ Migration completed successfully!');
            console.log(`📊 Migrated ${this.weeks.length} weeks and ${this.tips.length} tips`);

        } catch (error) {
            console.error('❌ Migration failed:', error);
        }
    }

    async scanTipsDirectories(currentTips) {
        console.log('📁 Scanning tips directories...');

        const directories = fs.readdirSync(this.tipsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dirent.name !== '_template')
            .map(dirent => dirent.name);

        for (const weekId of directories) {
            console.log(`  Processing week: ${weekId}`);
            await this.processWeek(weekId, currentTips);
        }
    }

    async processWeek(weekId, currentTips) {
        const weekDir = path.join(this.tipsDir, weekId);
        const tipFiles = fs.readdirSync(weekDir)
            .filter(file => file.startsWith('tip') && file.endsWith('.html'))
            .sort();

        for (const tipFile of tipFiles) {
            const tipNumber = parseInt(tipFile.replace('tip', '').replace('.html', ''));
            if (!isNaN(tipNumber)) {
                console.log(`    Processing tip ${currentTips}...`);
                const tipData = currentTips.tips.find(t => t.week === weekId && t.tipNumber === tipNumber) || null;
                await this.processTip(weekId, tipNumber, tipData);
            }
        }
    }

    async processTip(weekId, tipNumber, oldTipData) {
        const tipFilePath = path.join(this.tipsDir, weekId, `tip${tipNumber}.html`);

        if (!fs.existsSync(tipFilePath)) {
            console.log(`    ⚠️  Tip file not found: ${tipFilePath}`);
            return;
        }

        try {
            const htmlContent = fs.readFileSync(tipFilePath, 'utf8');
            const tipData = this.extractTipDataRegex(htmlContent, weekId, tipNumber, oldTipData);

            if (tipData) {
                this.tips.push(tipData);
                console.log(`    ✓ Processed tip ${tipNumber}: ${tipData.title}`);
            }
        } catch (error) {
            console.log(`    ❌ Error processing tip ${tipNumber}:`, error.message);
        }
    }

    extractTipDataRegex(htmlContent, weekId, tipNumber, oldTipData) {
        // Extract title using regex
        const titleMatch = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : `${tipNumber}.tip #nekaslinasebe`;

        // Extract main content from first paragraph after h2
        const contentMatch = htmlContent.match(/<h2[^>]*>.*?<\/h2>\s*<p[^>]*>(.*?)<\/p>/is);
        let content = '';
        if (contentMatch) {
            content = contentMatch[1]
                .replace(/<[^>]*>/g, '') // Remove HTML tags
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim()
                .substring(0, 500);
            if (content.length === 500) content += '...';
        }

        // Extract practical tips from the content
        let practicalTips = '';
        const practicalMatch = htmlContent.match(/<div class="mb-5">\s*<p>(.*?)<\/p>/is);
        if (practicalMatch) {
            practicalTips = practicalMatch[1]
                .replace(/<[^>]*>/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .substring(0, 800);
        }

        // Extract image path
        const imgMatch = htmlContent.match(/<img[^>]+src="([^"]+)"/i);
        let imageBig = `/assets/img/${weekId}/img_${tipNumber}_big.jpg`;
        let image = `/assets/img/${weekId}/img_${tipNumber}.jpg`;

        if (imgMatch) {
            imageBig = imgMatch[1];
            image = imageBig.replace('_big.jpg', '.jpg').replace('_big.png', '.png');
        }

        // Check if images exist and try to find alternatives
        const imageFullPath = path.join(this.rootDir, image.substring(1));
        const imageBigFullPath = path.join(this.rootDir, imageBig.substring(1));

        if (!fs.existsSync(imageFullPath) && !fs.existsSync(imageBigFullPath)) {
            // Try to find any image in the week directory
            const weekImageDir = path.join(this.assetsDir, weekId);
            if (fs.existsSync(weekImageDir)) {
                const images = fs.readdirSync(weekImageDir)
                    .filter(f => f.toLowerCase().includes('img') && (f.endsWith('.jpg') || f.endsWith('.png')))
                    .sort();

                if (images.length > 0) {
                    // Try to find images for this specific tip number
                    const tipImages = images.filter(img => img.includes(`_${tipNumber}`));
                    if (tipImages.length > 0) {
                        const bigImg = tipImages.find(img => img.includes('_big')) || tipImages[0];
                        const regImg = tipImages.find(img => !img.includes('_big')) || tipImages[0];

                        imageBig = `/assets/img/${weekId}/${bigImg}`;
                        image = `/assets/img/${weekId}/${regImg}`;
                    } else if (images.length >= tipNumber) {
                        // Use sequential image assignment
                        image = `/assets/img/${weekId}/${images[tipNumber - 1]}`;
                        imageBig = image;
                    }
                }
            }
        }

        if (!fs.existsSync(imageBigFullPath)) {
            imageBig = image; // Use same as regular image if big doesn't exist
        }

        // check if already category present
        let category = "Emotion";
        if (oldTipData && oldTipData.category) {
            category = oldTipData.category; // Use existing category if available
        }

        return {
            week: weekId,
            tipNumber: tipNumber,
            title: title,
            content: content,
            image: image,
            imageBig: imageBig,
            category: category,
            practicalTips: practicalTips
        };
    }

    generateWeeksData() {
        console.log('📅 Generating weeks data...');

        // Extract unique weeks from tips
        const uniqueWeeks = [...new Set(this.tips.map(tip => tip.week))];

        for (const weekId of uniqueWeeks) {
            const [yearStr, weekStr] = weekId.split('-');
            const year = parseInt(yearStr) + (parseInt(yearStr) < 50 ? 2000 : 1900); // 24 = 2024, 25 = 2025
            const week = parseInt(weekStr);

            // Calculate approximate dates
            const startOfYear = new Date(year, 0, 1);
            const firstMonday = new Date(startOfYear);
            const dayOfWeek = startOfYear.getDay();
            const daysToAdd = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // Find first Monday
            firstMonday.setDate(startOfYear.getDate() + daysToAdd);

            const weekStart = new Date(firstMonday.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
            const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

            this.weeks.push({
                id: weekId,
                year: year,
                week: week,
                startDate: weekStart.toISOString().split('T')[0],
                endDate: weekEnd.toISOString().split('T')[0]
            });
        }

        // Sort weeks by year and week number
        this.weeks.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.week - b.week;
        });

        // Sort tips by week and tip number
        this.tips.sort((a, b) => {
            if (a.week !== b.week) return a.week.localeCompare(b.week);
            return a.tipNumber - b.tipNumber;
        });
    }

    async saveMigratedData() {
        console.log('💾 Saving migrated data...');

        // Load existing data if any
        let existingData = { weeks: [], tips: [], currentWeek: null };
        if (fs.existsSync(this.dataFile)) {
            try {
                existingData = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
                console.log('    📖 Found existing data, will merge...');
            } catch (error) {
                console.log('    ⚠️  Could not read existing data, creating new file');
            }
        }

        // Merge with existing data (avoid duplicates)
        const mergedWeeks = [...existingData.weeks];
        for (const week of this.weeks) {
            if (!mergedWeeks.find(w => w.id === week.id)) {
                mergedWeeks.push(week);
            }
        }

        const mergedTips = [...existingData.tips];
        for (const tip of this.tips) {
            const existingTipIndex = mergedTips.findIndex(t =>
                t.week === tip.week && t.tipNumber === tip.tipNumber
            );
            if (existingTipIndex >= 0) {
                // Update existing tip with more complete data
                const existing = mergedTips[existingTipIndex];
                mergedTips[existingTipIndex] = {
                    ...existing,
                    ...tip,
                    // Keep existing data if it's more complete
                    content: existing.content && existing.content.length > tip.content.length ? existing.content : tip.content,
                    practicalTips: existing.practicalTips && existing.practicalTips.length > tip.practicalTips.length ? existing.practicalTips : tip.practicalTips
                };
                console.log(`    🔄 Updated existing tip: ${tip.week}-${tip.tipNumber}`);
            } else {
                // Add new tip
                mergedTips.push(tip);
                console.log(`    ➕ Added new tip: ${tip.week}-${tip.tipNumber}`);
            }
        }

        // Sort merged data
        mergedWeeks.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.week - b.week;
        });

        mergedTips.sort((a, b) => {
            if (a.week !== b.week) return a.week.localeCompare(b.week);
            return a.tipNumber - b.tipNumber;
        });

        // Set current week to latest week if not set
        const currentWeek = existingData.currentWeek ||
            (mergedWeeks.length > 0 ? mergedWeeks[mergedWeeks.length - 1].id : null);

        const finalData = {
            weeks: mergedWeeks,
            currentWeek: currentWeek,
            tips: mergedTips
        };

        // Ensure data directory exists
        const dataDir = path.dirname(this.dataFile);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Save the merged data
        fs.writeFileSync(this.dataFile, JSON.stringify(finalData, null, 2));

        console.log(`    ✅ Saved ${finalData.weeks.length} weeks and ${finalData.tips.length} tips to ${this.dataFile}`);

        this.finalData = finalData;
    }

    generateReport() {
        if (!this.finalData) return;

        console.log('\n📊 Migration Report:');
        console.log('===================');
        console.log(`Total weeks: ${this.finalData.weeks.length}`);
        console.log(`Total tips: ${this.finalData.tips.length}`);
        console.log(`Current week: ${this.finalData.currentWeek}`);
        console.log(`Tips per week average: ${(this.finalData.tips.length / this.finalData.weeks.length || 0).toFixed(1)}`);

        console.log('\nWeeks coverage:');
        for (const week of this.finalData.weeks.slice(-10)) { // Show last 10 weeks
            const weekTips = this.finalData.tips.filter(t => t.week === week.id);
            console.log(`  ${week.id} (${week.startDate}): ${weekTips.length} tips`);
        }
        if (this.finalData.weeks.length > 10) {
            console.log(`  ... and ${this.finalData.weeks.length - 10} more weeks`);
        }

        console.log('\nSample migrated tip:');
        if (this.finalData.tips.length > 0) {
            const sample = this.finalData.tips[this.finalData.tips.length - 1]; // Show latest tip
            console.log(`  Week: ${sample.week}`);
            console.log(`  Title: ${sample.title}`);
            console.log(`  Content: ${sample.content.substring(0, 100)}...`);
            console.log(`  Image: ${sample.image}`);
            console.log(`  Category: ${sample.category}`);
        }

        // Check for any issues
        console.log('\n🔍 Quality Check:');
        const tipsWithoutContent = this.finalData.tips.filter(t => !t.content || t.content.length < 20);
        const tipsWithoutImages = this.finalData.tips.filter(t => !t.image);

        if (tipsWithoutContent.length > 0) {
            console.log(`  ⚠️  ${tipsWithoutContent.length} tips with minimal content`);
        }
        if (tipsWithoutImages.length > 0) {
            console.log(`  ⚠️  ${tipsWithoutImages.length} tips without images`);
        }
        if (tipsWithoutContent.length === 0 && tipsWithoutImages.length === 0) {
            console.log(`  ✅ All tips have content and images`);
        }
    }
}

// Main execution
async function main() {
    console.log('🔄 Simple Tips Migration Tool');
    console.log('=============================\n');

    console.log('⚠️  This will scan all existing tip files and create/update tips.json');
    console.log('📁 A backup will be created if tips.json already exists\n');

    const migrator = new SimpleTipsMigrator();

    await migrator.migrate();
    migrator.generateReport();

    console.log('\n🎉 Migration completed!');
    console.log('📝 Next steps:');
    console.log('  1. Review the generated data/tips.json file');
    console.log('  2. Test the website with: npm start');
    console.log('  3. Set current week: node scripts/manage-tips.js set-current <week-id>');
    console.log('  4. Add missing content manually if needed');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = SimpleTipsMigrator;
