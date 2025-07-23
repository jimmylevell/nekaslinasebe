#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TipContentManager {
    constructor() {
        this.dataFile = path.join(__dirname, '..', 'data', 'tips.json');
        this.tipsDir = path.join(__dirname, '..', 'tips');
        this.templateFile = path.join(__dirname, '..', 'tip-template.html');
        this.assetsDir = path.join(__dirname, '..', 'assets', 'img');
    }

    loadData() {
        if (!fs.existsSync(this.dataFile)) {
            return { weeks: [], tips: [], currentWeek: null };
        }
        return JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
    }

    saveData(data) {
        const dir = path.dirname(this.dataFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    }

    addWeek(weekId, year, week, startDate, endDate) {
        const data = this.loadData();

        // Check if week already exists
        if (data.weeks.find(w => w.id === weekId)) {
            console.log(`Week ${weekId} already exists`);
            return;
        }

        // Add week
        data.weeks.push({
            id: weekId,
            year: parseInt(year),
            week: parseInt(week),
            startDate,
            endDate
        });

        // Sort weeks by year and week number
        data.weeks.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.week - b.week;
        });

        this.saveData(data);

        // Create directories
        const weekDir = path.join(this.tipsDir, weekId);
        const assetsWeekDir = path.join(this.assetsDir, weekId);

        if (!fs.existsSync(weekDir)) {
            fs.mkdirSync(weekDir, { recursive: true });
        }
        if (!fs.existsSync(assetsWeekDir)) {
            fs.mkdirSync(assetsWeekDir, { recursive: true });
        }

        console.log(`Added week ${weekId} and created directories`);
    }

    addTip(weekId, tipNumber, title, content, image, imageBig, category, practicalTips = '') {
        const data = this.loadData();

        // Check if week exists
        if (!data.weeks.find(w => w.id === weekId)) {
            console.log(`Week ${weekId} does not exist. Please add it first.`);
            return;
        }

        // Check if tip already exists
        if (data.tips.find(t => t.week === weekId && t.tipNumber === tipNumber)) {
            console.log(`Tip ${tipNumber} for week ${weekId} already exists`);
            return;
        }

        // Add tip
        data.tips.push({
            week: weekId,
            tipNumber: parseInt(tipNumber),
            title,
            content,
            image,
            imageBig,
            category,
            practicalTips
        });

        // Sort tips by week and tip number
        data.tips.sort((a, b) => {
            if (a.week !== b.week) return a.week.localeCompare(b.week);
            return a.tipNumber - b.tipNumber;
        });

        this.saveData(data);

        // Create tip HTML file
        this.createTipFile(weekId, tipNumber);

        console.log(`Added tip ${tipNumber} for week ${weekId}`);
    }

    createTipFile(weekId, tipNumber) {
        const weekDir = path.join(this.tipsDir, weekId);
        const tipFile = path.join(weekDir, `tip${tipNumber}.html`);

        if (!fs.existsSync(weekDir)) {
            fs.mkdirSync(weekDir, { recursive: true });
        }

        // Copy template file
        if (fs.existsSync(this.templateFile)) {
            fs.copyFileSync(this.templateFile, tipFile);
            console.log(`Created ${tipFile}`);
        } else {
            console.log(`Template file not found: ${this.templateFile}`);
        }
    }

    setCurrentWeek(weekId) {
        const data = this.loadData();

        if (!data.weeks.find(w => w.id === weekId)) {
            console.log(`Week ${weekId} does not exist`);
            return;
        }

        data.currentWeek = weekId;
        this.saveData(data);
        console.log(`Set current week to ${weekId}`);
    }

    listWeeks() {
        const data = this.loadData();
        console.log('Available weeks:');
        data.weeks.forEach(week => {
            const tipCount = data.tips.filter(t => t.week === week.id).length;
            const current = week.id === data.currentWeek ? ' (CURRENT)' : '';
            console.log(`  ${week.id}: ${week.startDate} - ${week.endDate} (${tipCount} tips)${current}`);
        });
    }

    listTips(weekId = null) {
        const data = this.loadData();
        const tips = weekId ? data.tips.filter(t => t.week === weekId) : data.tips;

        console.log(weekId ? `Tips for week ${weekId}:` : 'All tips:');
        tips.forEach(tip => {
            console.log(`  ${tip.week}-${tip.tipNumber}: ${tip.title}`);
        });
    }

    updateTip(weekId, tipNumber, field, value) {
        const data = this.loadData();

        const tipIndex = data.tips.findIndex(t => t.week === weekId && t.tipNumber === parseInt(tipNumber));
        if (tipIndex === -1) {
            console.log(`Tip ${tipNumber} for week ${weekId} not found`);
            return;
        }

        const validFields = ['title', 'content', 'image', 'imageBig', 'category', 'practicalTips'];
        if (!validFields.includes(field)) {
            console.log(`Invalid field: ${field}. Valid fields are: ${validFields.join(', ')}`);
            return;
        }

        data.tips[tipIndex][field] = value;
        this.saveData(data);
        console.log(`Updated ${field} for tip ${weekId}-${tipNumber}`);
    }

    deleteTip(weekId, tipNumber) {
        const data = this.loadData();

        const tipIndex = data.tips.findIndex(t => t.week === weekId && t.tipNumber === parseInt(tipNumber));
        if (tipIndex === -1) {
            console.log(`Tip ${tipNumber} for week ${weekId} not found`);
            return;
        }

        data.tips.splice(tipIndex, 1);
        this.saveData(data);

        // Optionally delete the HTML file
        const tipFile = path.join(this.tipsDir, weekId, `tip${tipNumber}.html`);
        if (fs.existsSync(tipFile)) {
            fs.unlinkSync(tipFile);
            console.log(`Deleted ${tipFile}`);
        }

        console.log(`Deleted tip ${weekId}-${tipNumber}`);
    }

    deleteWeek(weekId) {
        const data = this.loadData();

        // Remove week
        const weekIndex = data.weeks.findIndex(w => w.id === weekId);
        if (weekIndex === -1) {
            console.log(`Week ${weekId} not found`);
            return;
        }

        data.weeks.splice(weekIndex, 1);

        // Remove all tips for this week
        data.tips = data.tips.filter(t => t.week !== weekId);

        // Update current week if it was deleted
        if (data.currentWeek === weekId) {
            data.currentWeek = data.weeks.length > 0 ? data.weeks[data.weeks.length - 1].id : null;
        }

        this.saveData(data);

        // Optionally delete the directory
        const weekDir = path.join(this.tipsDir, weekId);
        if (fs.existsSync(weekDir)) {
            fs.rmSync(weekDir, { recursive: true, force: true });
            console.log(`Deleted directory ${weekDir}`);
        }

        console.log(`Deleted week ${weekId} and all its tips`);
    }

    showStatus() {
        const data = this.loadData();
        console.log('📊 Tips Database Status:');
        console.log('========================');
        console.log(`Total weeks: ${data.weeks.length}`);
        console.log(`Total tips: ${data.tips.length}`);
        console.log(`Current week: ${data.currentWeek || 'None set'}`);

        if (data.weeks.length > 0) {
            const firstWeek = data.weeks[0];
            const lastWeek = data.weeks[data.weeks.length - 1];
            console.log(`Date range: ${firstWeek.startDate} to ${lastWeek.endDate}`);
        }

        // Show recent weeks
        console.log('\nRecent weeks:');
        data.weeks.slice(-5).forEach(week => {
            const tipCount = data.tips.filter(t => t.week === week.id).length;
            const current = week.id === data.currentWeek ? ' (CURRENT)' : '';
            console.log(`  ${week.id}: ${tipCount} tips${current}`);
        });
    }

    exportData(format = 'json') {
        const data = this.loadData();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        if (format === 'json') {
            const exportFile = path.join(__dirname, '..', `tips-export-${timestamp}.json`);
            fs.writeFileSync(exportFile, JSON.stringify(data, null, 2));
            console.log(`Exported data to ${exportFile}`);
        } else if (format === 'csv') {
            const csvContent = this.generateCSV(data);
            const exportFile = path.join(__dirname, '..', `tips-export-${timestamp}.csv`);
            fs.writeFileSync(exportFile, csvContent);
            console.log(`Exported data to ${exportFile}`);
        }
    }

    generateCSV(data) {
        const headers = ['Week ID', 'Tip Number', 'Title', 'Content', 'Image', 'Category', 'Start Date', 'End Date'];
        const rows = [headers.join(',')];

        data.tips.forEach(tip => {
            const week = data.weeks.find(w => w.id === tip.week);
            const row = [
                tip.week,
                tip.tipNumber,
                `"${tip.title.replace(/"/g, '""')}"`,
                `"${tip.content.replace(/"/g, '""').substring(0, 100)}..."`,
                tip.image,
                tip.category,
                week ? week.startDate : '',
                week ? week.endDate : ''
            ];
            rows.push(row.join(','));
        });

        return rows.join('\n');
    }
}

// CLI Interface
const args = process.argv.slice(2);
const manager = new TipContentManager();

switch (args[0]) {
    case 'add-week':
        if (args.length < 6) {
            console.log('Usage: node manage-tips.js add-week <weekId> <year> <week> <startDate> <endDate>');
            console.log('Example: node manage-tips.js add-week 25-29 2025 29 2025-07-14 2025-07-20');
        } else {
            manager.addWeek(args[1], args[2], args[3], args[4], args[5]);
        }
        break;

    case 'add-tip':
        if (args.length < 8) {
            console.log('Usage: node manage-tips.js add-tip <weekId> <tipNumber> <title> <content> <image> <imageBig> <category> [practicalTips]');
            console.log('Example: node manage-tips.js add-tip 25-29 1 "1.tip #nekaslinasebe" "Content here..." "/assets/img/25-29/img_1.jpg" "/assets/img/25-29/img_1_big.jpg" "web" "Practical tips here..."');
        } else {
            manager.addTip(args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8] || '');
        }
        break;

    case 'update-tip':
        if (args.length < 5) {
            console.log('Usage: node manage-tips.js update-tip <weekId> <tipNumber> <field> <value>');
            console.log('Fields: title, content, image, imageBig, category, practicalTips');
            console.log('Example: node manage-tips.js update-tip 25-29 1 title "New Title"');
        } else {
            manager.updateTip(args[1], args[2], args[3], args.slice(4).join(' '));
        }
        break;

    case 'delete-tip':
        if (args.length < 3) {
            console.log('Usage: node manage-tips.js delete-tip <weekId> <tipNumber>');
        } else {
            manager.deleteTip(args[1], args[2]);
        }
        break;

    case 'delete-week':
        if (args.length < 2) {
            console.log('Usage: node manage-tips.js delete-week <weekId>');
        } else {
            manager.deleteWeek(args[1]);
        }
        break;

    case 'set-current':
        if (args.length < 2) {
            console.log('Usage: node manage-tips.js set-current <weekId>');
        } else {
            manager.setCurrentWeek(args[1]);
        }
        break;

    case 'list-weeks':
        manager.listWeeks();
        break;

    case 'list-tips':
        manager.listTips(args[1]);
        break;

    case 'status':
        manager.showStatus();
        break;

    case 'export':
        manager.exportData(args[1] || 'json');
        break;

    default:
        console.log('🔧 Tips Content Management Tool');
        console.log('================================\n');
        console.log('Available commands:');
        console.log('');
        console.log('📅 Week Management:');
        console.log('  add-week <weekId> <year> <week> <startDate> <endDate>');
        console.log('  delete-week <weekId>');
        console.log('  list-weeks');
        console.log('  set-current <weekId>');
        console.log('');
        console.log('📝 Tip Management:');
        console.log('  add-tip <weekId> <tipNumber> <title> <content> <image> <imageBig> <category> [practicalTips]');
        console.log('  update-tip <weekId> <tipNumber> <field> <value>');
        console.log('  delete-tip <weekId> <tipNumber>');
        console.log('  list-tips [weekId]');
        console.log('');
        console.log('📊 Information:');
        console.log('  status');
        console.log('  export [json|csv]');
        console.log('');
        console.log('📖 Examples:');
        console.log('  node manage-tips.js add-week 25-30 2025 30 2025-07-21 2025-07-27');
        console.log('  node manage-tips.js add-tip 25-30 1 "1.tip #nekaslinasebe" "Content..." "/assets/img/25-30/img_1.jpg" "/assets/img/25-30/img_1_big.jpg" "web"');
        console.log('  node manage-tips.js set-current 25-30');
        console.log('  node manage-tips.js status');
}

module.exports = TipContentManager;
