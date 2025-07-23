# #nekaslinasebe Content Management System

This improved system simplifies adding new tips and reduces maintenance overhead.

## Quick Start
### Adding a New Week

```bash
cd scripts
node manage-tips.js add-week 25-29 2025 29 2025-07-14 2025-07-20
```

### Adding a New Tip

```bash
node manage-tips.js add-tip 25-29 1 "1.tip #nekaslinasebe" "Content here..." "/assets/img/25-29/img_1.jpg" "/assets/img/25-29/img_1_big.jpg" "web" "Practical tips here..."
```

### Setting Current Week (for homepage)

```bash
node manage-tips.js set-current 25-29
```

### View All Content

```bash
# List all weeks
node manage-tips.js list-weeks

# List all tips
node manage-tips.js list-tips

# List tips for specific week
node manage-tips.js list-tips 25-29
```

## Data Format

All content is stored in `/data/tips.json`:

```json
{
  "weeks": [
    {
      "id": "25-29",
      "year": 2025,
      "week": 29,
      "startDate": "2025-07-14",
      "endDate": "2025-07-20"
    }
  ],
  "currentWeek": "25-29",
  "tips": [
    {
      "week": "25-29",
      "tipNumber": 1,
      "title": "1.tip #nekaslinasebe",
      "content": "Your tip content...",
      "image": "/assets/img/25-29/img_1.jpg",
      "imageBig": "/assets/img/25-29/img_1_big.jpg",
      "category": "web",
      "practicalTips": "Practical instructions..."
    }
  ]
}
```

## Workflow for Adding New Tips

1. **Create new week** (if needed):
   ```bash
   node manage-tips.js add-week 25-30 2025 30 2025-07-21 2025-07-27
   ```

2. **Add images** to `/assets/img/25-30/`

3. **Add tips** (repeat for tips 1-6):
   ```bash
   node manage-tips.js add-tip 25-30 1 "1.tip #nekaslinasebe" "Your content..." "/assets/img/25-30/img_1.jpg" "/assets/img/25-30/img_1_big.jpg" "web" "Practical tips..."
   ```

4. **Set as current week** (when ready to publish):
   ```bash
   node manage-tips.js set-current 25-30
   ```
