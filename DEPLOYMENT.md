# 🚀 Deployment Guide - Host Your Wedding Invitation

This guide shows you exactly how to host your wedding invitation website on free platforms.

## Option 1: **Netlify** ⭐ (Recommended - Easiest)

### Step-by-Step:

1. **Go to [netlify.com](https://netlify.com)**
   - Click "Sign Up"
   - Choose "Sign up with GitHub" or use email

2. **Deploy Your Files**
   - After login, click "Add new site" → "Deploy manually"
   - Simply **drag and drop** your 3 files into the area:
     - `index.html`
     - `styles.css`
     - `script.js`

3. **Your Site is Live!**
   - Netlify generates a URL like: `https://your-name-xyz.netlify.app`
   - Share this URL with your guests

4. **Custom Domain (Optional)**
   - In Netlify dashboard, go to Site settings → Domain management
   - You can purchase a custom domain (like `yourweddingname.com`)

### Advantages:
- ✅ Super easy (just drag and drop)
- ✅ Free HTTPS
- ✅ Instant deployment
- ✅ Good uptime

---

## Option 2: **Vercel**

### Step-by-Step:

1. **Go to [vercel.com](https://vercel.com)**
   - Click "Sign Up"
   - Choose sign-up method (GitHub, GitLab, or email)

2. **Create a Project**
   - Click "Add New..." → "Project"
   - Upload your folder

3. **It's Deployed!**
   - Your URL: `https://your-project.vercel.app`

### Advantages:
- ✅ Very fast
- ✅ Modern deployment platform
- ✅ Easy to manage

---

## Option 3: **GitHub Pages** (Completely Free Forever)

### Step-by-Step:

1. **Create GitHub Account**
   - Go to [github.com](https://github.com)
   - Click "Sign up"
   - Verify your email

2. **Create Repository**
   - Click "+" icon → "New repository"
   - Name: `wedding-invitation`
   - Choose "Public"
   - Click "Create repository"

3. **Upload Your Files**
   - Click "Add file" → "Upload files"
   - Drag and drop:
     - `index.html`
     - `styles.css`
     - `script.js`
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to repository **Settings**
   - Scroll to "Pages" section
   - Source: Select **"main"** branch
   - Click "Save"

5. **Get Your URL**
   - Your site: `https://yourusername.github.io/wedding-invitation`
   - Wait 2-3 minutes for deployment

### Advantages:
- ✅ Completely free forever
- ✅ No credit card needed
- ✅ Good for version control
- ✅ Easy to update

### How to Update:
1. Go to repository
2. Click on the file you want to edit
3. Click the pencil icon ✏️
4. Make changes
5. Click "Commit changes"

---

## Option 4: **Firebase Hosting** (Google)

### Step-by-Step:

1. **Go to [firebase.google.com](https://firebase.google.com)**
   - Click "Get started"
   - Sign in with your Google account

2. **Create Project**
   - Click "Create a project"
   - Project name: "Wedding Invitation"
   - Accept defaults
   - Click "Create project"

3. **Enable Hosting**
   - Click "Hosting" in left menu
   - Click "Get started"
   - Follow the setup wizard

4. **Deploy Using Command Line**

   If you have Node.js installed:
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools

   # Login to Firebase
   firebase login

   # Navigate to your project folder
   cd /path/to/MarriageInvitation

   # Initialize Firebase
   firebase init hosting

   # Deploy
   firebase deploy
   ```

5. **Get Your URL**
   - After deployment, you'll see: `https://your-project.web.app`

### Advantages:
- ✅ Backed by Google
- ✅ Good performance
- ✅ Reliable uptime

---

## Option 5: **Surge.sh** (Super Simple)

### Step-by-Step:

1. **Install Node.js** (if you don't have it)
   - Go to [nodejs.org](https://nodejs.org)
   - Download and install

2. **Install Surge**
   ```bash
   npm install -g surge
   ```

3. **Deploy**
   ```bash
   # Navigate to your project folder
   cd /path/to/MarriageInvitation

   # Deploy
   surge
   ```

4. **Follow Prompts**
   - Email: Enter your email
   - Password: Create password
   - Domain: `your-wedding-invitation.surge.sh`

5. **Your Site is Live!**
   - Visit the domain shown

### Advantages:
- ✅ Very simple
- ✅ Quick deployment
- ✅ Easy to update

---

## Option 6: **InfinityFree** (Completely Free Hosting)

### Step-by-Step:

1. **Go to [infinityfree.net](https://www.infinityfree.net)**
   - Click "Create an account"
   - Fill in your details
   - Verify email

2. **Create Hosting Account**
   - Click "Create new free account"
   - Choose a domain (or use free domain)
   - Wait for approval (usually instant)

3. **Upload Files**
   - Use File Manager
   - Navigate to `public_html` folder
   - Upload `index.html`, `styles.css`, `script.js`

4. **Your Site is Live!**
   - Your URL will be shown in dashboard

### Advantages:
- ✅ No credit card required
- ✅ Completely free
- ✅ Easy file management

---

## Comparison Table

| Platform | Setup Time | Cost | Uptime | Custom Domain | Notes |
|----------|-----------|------|--------|---------------|-------|
| **Netlify** ⭐ | 2 min | Free | 99.99% | $12/yr | Best for beginners |
| Vercel | 2 min | Free | 99.99% | Paid | Fast, modern |
| GitHub Pages | 5 min | Free | 99.99% | Paid | Easy updates |
| Firebase | 10 min | Free | 99.99% | Paid | Google backed |
| Surge | 1 min | Free | Good | $12/yr | Command line |
| InfinityFree | 5 min | Free | Good | Free | Most affordable |

---

## Step 5: Generate QR Code

Once your site is live:

1. **Using QR Generator HTML**
   - Open `qr-generator.html` in your browser
   - Enter your hosted URL
   - Customize colors and size
   - Download the QR code image

2. **Using Online Tools**
   - Go to [qr-code-generator.com](https://www.qr-code-generator.com)
   - Enter your URL
   - Download QR code

3. **Using Command Line** (Mac/Linux)
   ```bash
   npm install -g qrcode-terminal
   qrcode "https://your-url.netlify.app"
   ```

---

## Step 6: Share Your Invitation

Once you have:
1. Your hosted URL
2. Your QR code

### Share via:
- **WhatsApp**: Send URL + image with QR code
- **SMS**: Share short URL (use bit.ly if needed)
- **Email**: Send HTML version or link
- **Print**: Print invitation with QR code
- **Social Media**: Share on Facebook, Instagram

---

## Update Your Content

Your content is saved locally in your browser. If you want to:

### Update via Browser (Any Platform):
1. Open your hosted URL
2. Click "Admin" button
3. Edit content
4. Click "Save Changes"
5. Changes are instantly saved in your browser

### Create Backup:
1. Click "Admin"
2. Click "Download Config"
3. Save the JSON file
4. Keep safe for future reference

---

## Troubleshooting

### Site not loading?
- Wait 2-3 minutes after deployment
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito mode
- Check that all 3 files were uploaded

### Changes not showing?
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check you're logged in to the right account

### Can't see admin panel?
- Try keyboard shortcut: Ctrl+Shift+A
- Click the "Admin" button again
- Clear browser cookies

### QR code won't scan?
- Ensure sufficient contrast
- Make QR code larger (at least 2cm x 2cm)
- Test with multiple phones
- Try different QR reader apps

---

## Need Help?

- **Netlify Support**: [netlify.com/support](https://netlify.com/support)
- **Vercel Support**: [vercel.com/help](https://vercel.com/help)
- **GitHub Pages Docs**: [pages.github.com](https://pages.github.com)
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

## Summary

1. ✅ Choose a platform (Netlify recommended)
2. ✅ Upload your 3 files
3. ✅ Get your URL
4. ✅ Generate QR code
5. ✅ Share with guests!

**That's it! Your invitation is now live! 🎉**
