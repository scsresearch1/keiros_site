# Keiros IoT Ecosystem Website

An informative, static website for Keiros - an advanced IoT ecosystem combining smart hardware (LoRa + GNSS), resilient firmware, and ERP platform. Designed for US enterprise clients with modern animations, clean typography, and a scientific design tone.

## Features

- **Modern Design**: Futuristic, professional aesthetic with charcoal/slate color palette
- **Scroll-Based Animations**: Smooth animations triggered on scroll
- **3D Device Visualization**: Interactive 3D device model with rotation
- **Responsive Layout**: Fully responsive design for desktop, tablet, and mobile
- **Performance Optimized**: Lazy loading, optimized animations, GPU acceleration
- **SEO Ready**: Complete metadata, Open Graph tags, and structured data
- **Accessibility**: Respects `prefers-reduced-motion` and semantic HTML

## Structure

```
KeirosWebsite/
├── index.html      # Main HTML file with all sections
├── styles.css      # Complete styling with animations
├── script.js       # JavaScript for interactivity and animations
└── README.md       # This file
```

## Sections

1. **Hero/Landing** - Main introduction with 3D device animation
2. **About Keiros** - Ecosystem overview (Device + Firmware + ERP)
3. **Device Section** - Hardware architecture and specifications
4. **Firmware Section** - OTA updates, diagnostics, and telemetry
5. **ERP Platform** - Dashboard mockup with animated metrics
6. **Integration Flow** - Data flow visualization (Device → Gateway → Cloud → ERP)
7. **Use Cases** - Smart agriculture, logistics, industrial monitoring
8. **Technical Specifications** - Complete technical details in tabbed format
9. **Contact** - Contact form and company information

## Design System

### Colors
- Charcoal: `#101010`
- Slate: `#1A1A1A`
- Accent: `#00BFFF`
- Highlight: `#8AEFFF`
- Text: `#FFFFFF`
- Text Secondary: `#CCCCCC`

### Typography
- Primary: Inter
- Secondary: Space Grotesk
- Monospace: IBM Plex Sans

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized for Lighthouse scores ≥ 90 (desktop), ≥ 85 (mobile)
- GPU-accelerated animations
- Lazy loading for non-critical content
- Minimal external dependencies

## Deployment

This is a fully static website with no server-side dependencies. Deploy to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to repository and enable Pages
- **AWS S3 + CloudFront**: Upload files to S3 bucket
- **Any web server**: Upload files via FTP/SFTP

## Customization

### Update Company Information
Edit the contact section in `index.html`:
- Company address
- Email addresses
- Contact information

### Modify Colors
Update CSS variables in `styles.css`:
```css
:root {
    --color-charcoal: #101010;
    --color-accent: #00BFFF;
    /* ... */
}
```

### Update Content
All content is in `index.html`. Modify text, sections, and structure as needed.

## Contact Form

The contact form currently uses a `mailto:` link for submission. For production use, replace the form handler in `script.js` with:
- A server-side API endpoint
- A third-party form service (Formspree, Netlify Forms, etc.)
- An email service integration

## License

© 2024 Keiros. All rights reserved.

