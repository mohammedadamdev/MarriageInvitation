# 💍 Wedding Invitation Website

A beautiful, fully editable, and mobile-responsive wedding invitation website that can be hosted for free and easily shared via QR codes.

## ✨ Features

- **Elegant Design**: Premium wedding invitation template with modern styling
- **Fully Editable Admin Panel**: Edit all content directly from your browser (no coding required)
- **Mobile Responsive**: Perfect display on all devices (desktop, tablet, mobile)
- **Local Data Storage**: All changes are saved to your browser's local storage
- **Print Friendly**: Can be printed as an invitation
- **Free Hosting Options**: Multiple free hosting providers support
- **QR Code Ready**: Generate QR codes to share the invitation link via WhatsApp, text, email, etc.

## 📋 Project Structure

```
MarriageInvitation/
├── index.html          # Main HTML file with invitation structure
├── styles.css          # Complete styling and responsive design
├── script.js           # JavaScript for admin panel and functionality
├── README.md           # This file
└── config.json         # (Optional) Exported configuration backup
```

## 🎯 Quick Start

### 🛠️ Setup & Local Development

Follow these steps to get the project running on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MarriageInvitation.git
   cd MarriageInvitation
   ```

2. **Run the website**
   Since this is a static site, you have several ways to view it locally:

   *   **Using VS Code (Recommended):**
       Install the **Live Server** extension, then click "Go Live" in the bottom right corner.
   
   *   **Using Python (Quickest):**
       ```bash
       python3 -m http.server 8000
       ```
       Then visit `http://localhost:8000` in your browser.

   *   **Using Node.js:**
       ```bash
       npx serve .
       ```

### 1. Edit Your Invitation

Edit **`config.js`** for names, dates, and addresses (short display address vs full directions address for Google Maps).

Or use the in-browser editor:

1. Open the site in your browser
2. Click **Edit** in the navigation bar
3. Fill in your wedding details:
   - Bride & Groom names
   - Wedding date and time
   - Venue information
   - RSVP contact details
   - Gallery captions
4. Click **"Save Changes"** to persist data
5. Close the admin panel

### 2. Local Testing

- Open the folder in VS Code
- Use **Live Server** extension (if installed) or open `index.html` directly in your browser
- Keyboard shortcut: **Ctrl+Shift+A** (or **Cmd+Shift+A** on Mac) to open/close admin panel

### 3. Download Your Configuration

- Click **"Download Config"** in the admin panel to backup your data as JSON
- This can be useful for restoring data later

## 🌐 Free Hosting Options

### Option 1: **Netlify** (Recommended - Easiest)

1. Visit [netlify.com](https://netlify.com)
2. Sign up with GitHub, GitLab, or email
3. **Drag and drop** your folder with all 3 files
4. Your site is live instantly!
5. You get a free domain like: `https://your-invitation-xyz.netlify.app`

### Option 2: **Vercel**

1. Visit [vercel.com](https://vercel.com)
2. Sign up and create new project
3. Upload your files or connect your GitHub repository
4. Automatic deployment - your site is live!
5. Get a free domain like: `https://your-invitation.vercel.app`

### Option 3: **GitHub Pages** (Free Forever)

1. Create a GitHub account if you don't have one
2. Create a new repository named `wedding-invitation`
3. Upload all three files (`index.html`, `styles.css`, `script.js`)
4. Go to **Settings** → **Pages** → Set source to **main branch**
5. Your site will be live at: `https://yourusername.github.io/wedding-invitation`

### Option 4: **Firebase Hosting** (Google)

1. Visit [firebase.google.com](https://firebase.google.com)
2. Create a new project
3. Install Firebase CLI: `npm install -g firebase-tools`
4. Run: `firebase login` and `firebase init hosting`
5. Deploy: `firebase deploy`

### Option 5: **Surge.sh** (Super Simple)

1. Install Surge: `npm install -g surge`
2. Navigate to your folder in terminal
3. Run: `surge`
4. Choose a domain name (e.g., `your-wedding-invitation.surge.sh`)
5. Done! Your site is live

## 📱 Generate QR Code

Once your site is hosted, create a QR code:

### Using Online Tools:
1. Visit [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Enter your hosted URL (e.g., `https://your-invitation.netlify.app`)
3. Customize the QR code design
4. Download as PNG or SVG
5. Print it or share digitally

### Using Command Line:
```bash
# Install qrcode-terminal (if you have Node.js)
npm install -g qrcode-terminal

# Generate QR code
qrcode "https://your-invitation.netlify.app"
```

## 📝 Editable Sections

### General Tab
- Bride & Groom names
- Invitation label (e.g., "Together with their families")
- Invitation text
- Wedding date, year, and time
- RSVP deadline and contact details

### Details Tab
- Venue name and address
- Dress code
- Reception information
- Additional details for each section

### Gallery Tab
- 4 caption names for photo gallery
- To add images, edit the HTML to replace placeholder divs with `<img>` tags

## 💾 Saving Your Data

### Automatic (Browser)
- All changes are automatically saved to your browser's local storage
- Data persists even after closing and reopening the browser

### Manual Backup
1. Click **"Download Config"** in the admin panel
2. Save the `invitation-config.json` file
3. Keep this as a backup

### Restoring Data
1. Open browser's Developer Tools (F12)
2. Go to **Console**
3. Paste and run:
```javascript
// Replace with your data
const data = { /* your config.json content */ };
localStorage.setItem('invitationData', JSON.stringify(data));
location.reload();
```

## 🎨 Customization

### Change Colors
Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #8B4F9F;      /* Purple */
    --secondary-color: #D4A5A5;    /* Rose */
    --accent-color: #F4E4C1;       /* Gold */
    --dark-color: #3A3A3A;         /* Dark Gray */
    --light-color: #F8F6F1;        /* Light Cream */
    --gold-color: #C9A876;         /* Gold Accent */
}
```

### Add Gallery Images
In `index.html`, replace:
```html
<div class="gallery-placeholder">Gallery Image 1</div>
```

With:
```html
<img src="https://your-image-url.jpg" alt="Our Engagement" style="width: 100%; height: 300px; object-fit: cover;">
```

## 🔒 Privacy & Security

- **No backend server**: All data is stored locally on the user's device
- **No data collection**: Your wedding information is never sent to any server
- **HTTPS recommended**: When hosting, use HTTPS for security

## 📱 Mobile Tips

- The site is fully responsive
- Test on multiple devices before sending invitations
- Share the link via WhatsApp, SMS, or email
- Ensure the QR code is clear and scannable

## 🆘 Troubleshooting

### Changes not saving?
- Check browser's privacy/incognito mode
- Clear browser cache and try again
- Use a different browser

### Images not showing?
- Ensure image URLs are correct and publicly accessible
- Use HTTPS URLs for better compatibility
- Check browser console for errors (F12)

### QR code not scanning?
- Ensure sufficient contrast (light background, dark QR code)
- Test with multiple phones/QR readers
- Increase QR code size

## 📧 Support

For questions or issues:
1. Check the code comments in HTML/CSS/JS files
2. Review browser console for error messages (F12)
3. Test in incognito mode to rule out caching issues

## 🎁 Tips for Success

1. **Test first**: Preview on mobile before sending invitations
2. **Get feedback**: Ask a few people to test the invitation
3. **Keep it simple**: Don't make content too long
4. **Use high-quality images**: For gallery photos
5. **Test links**: Verify all contact information works
6. **Print test**: If offering printed version, test print style (Ctrl+P)

## 📄 License

Free to use and modify for your wedding. Feel free to customize as needed!

---

**Have a wonderful wedding! 💍✨**

Created with ❤️ for your special day
