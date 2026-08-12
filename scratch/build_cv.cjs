const fs = require('fs');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');

const originalPdfPath = 'C:\\Users\\lsidq\\OneDrive\\Desktop\\CV Lisan Sidqi.pdf';
const generatedCvPdf = 'C:\\Users\\lsidq\\Documents\\antigravity\\quick-davinci\\pt-abbasy\\scratch\\cv_temp.pdf';
const finalPdfPath = 'C:\\Users\\lsidq\\OneDrive\\Desktop\\CV Lisan Sidqi.pdf';

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 0;
      margin: 0;
      font-size: 13px;
    }
    .container {
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
      letter-spacing: 1px;
    }
    .header h2 {
      margin: 5px 0 10px 0;
      font-size: 14px;
      font-weight: 600;
      color: #34495e;
      letter-spacing: 0.5px;
    }
    .contact-info {
      font-size: 12px;
      color: #555;
    }
    .contact-info a {
      color: #3498db;
      text-decoration: none;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #2c3e50;
      border-bottom: 2px solid #bdc3c7;
      padding-bottom: 4px;
      margin-top: 25px;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .job-title-row {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 2px;
    }
    .job-company {
      font-style: italic;
      color: #555;
      margin-bottom: 6px;
    }
    .experience-list {
      margin: 0 0 15px 0;
      padding-left: 20px;
    }
    .experience-list li {
      margin-bottom: 4px;
      text-align: justify;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
    }
    .skills-table td {
      padding: 3px 0;
      vertical-align: top;
    }
    .skills-table td:first-child {
      font-weight: 700;
      width: 25%;
      color: #2c3e50;
    }
    p { margin: 0 0 10px 0; text-align: justify; }
    .school-row {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .school-name {
      font-style: italic;
      color: #555;
      margin-bottom: 4px;
    }
    .school-details {
      padding-left: 20px;
      margin-bottom: 12px;
    }
    .cert-list {
      padding-left: 20px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LISAN SIDQI, S.KOM</h1>
      <h2>HARDWORKING IT PROFESSIONAL</h2>
      <div class="contact-info">
        📍 Bekasi, West Java, Indonesia &nbsp;|&nbsp; 📱 085882198994 &nbsp;|&nbsp; ✉️ Lsidqi51@gmail.com <br>
        🔗 <a href="https://linkedin.com/in/lisan-sidqi-02397685/">linkedin.com/in/lisan-sidqi-02397685/</a>
      </div>
    </div>

    <div class="section-title">PROFESSIONAL SUMMARY</div>
    <p>A disciplined and highly adaptable Bachelor of Information Technology graduate with a Cum Laude predicate. Passionate about software development and eager to continuously learn new technologies. Possesses a strong foundation in Computer Science with over 5 years of experience as a Fullstack Developer specializing in high-performance enterprise applications and the healthcare industry. Adept at orchestrating Agentic AI workflows to accelerate full-cycle software development and deliver scalable architectures.</p>

    <div class="section-title">WORK EXPERIENCE</div>
    
    <div class="job-title-row">
      <div>Fullstack Engineer & Systems Architect</div>
      <div>May 2026 - Present</div>
    </div>
    <div class="job-company">Freelance / Independent Contractor</div>
    <ul class="experience-list">
      <li><strong>Enterprise Resource Planning (ERP) System:</strong> Architected and developed a large-scale, high-performance ERP platform from scratch to centralize B2B operations, including POS, Inventory Management, Procurement, HR, and Core Accounting (General Ledger).</li>
      <li><strong>Performance Optimization:</strong> Resolved critical memory exhaustion and timeouts by designing analytics microservices using Golang (Fiber) and In-Memory Caching (Redis), drastically reducing report generation time for tens of thousands of rows from 20+ seconds to under 1 second.</li>
      <li><strong>AI Integration:</strong> Engineered an advanced split-view Point of Sales (POS) interface integrated with a local AI Assistant (Google Gemini & Ollama) utilizing Fuzzy Search and RegEx for highly accurate item recommendations.</li>
      <li><strong>Database Management:</strong> Designed a robust PostgreSQL database structure, pruned inefficient data objects, and implemented periodic index reorganizations to significantly boost query execution speeds for heavy transactions.</li>
      <li><strong>Enterprise Security:</strong> Implemented comprehensive security protocols including Laravel Sanctum for stateful SPA authentication, custom Role-Based Access Control (RBAC) middleware, and strict session management to prevent unauthorized access.</li>
      <li><strong>Tech Stack:</strong> Laravel 11, PHP 8.2, Laravel Octane (Swoole), React.js, Inertia.js, Tailwind CSS, Golang (Fiber), PostgreSQL, Redis, Docker, AI (Gemini & Ollama).</li>
    </ul>

    <div class="job-title-row">
      <div>Frontend Developer</div>
      <div>July 2026 - Present</div>
    </div>
    <div class="job-company">Freelance / PT. Abbasy Anugerah Perkasa – Depok</div>
    <ul class="experience-list">
      <li><strong>Corporate Website & Headless CMS:</strong> Developed a high-performance, fully dynamic corporate website enabling non-technical staff to independently modify content through Decap CMS (Git-based Headless CMS).</li>
      <li><strong>System Architecture:</strong> Designed and implemented a 3-layer anti-blank-page architecture to resolve aggressive edge caching conflicts from Cloudflare, ensuring 100% uptime during deployments and content updates.</li>
      <li><strong>Modern UI/UX:</strong> Implemented a modern, responsive user interface featuring glassmorphism effects, auto-collapsing navigation, and smooth scroll animations utilizing Framer Motion.</li>
      <li><strong>SEO Optimization:</strong> Optimized technical SEO by embedding Schema.org structured data (Organization & WebSite potentialAction) and managing custom cache headers, maximizing Google Search visibility.</li>
      <li><strong>Tech Stack:</strong> React.js, Vite, Decap CMS, Cloudflare Pages, GitHub Actions (CI/CD), Framer Motion, Vanilla CSS.</li>
    </ul>

    <div style="page-break-before: always;"></div>
    <div style="height: 40px;"></div>

    <div class="job-title-row">
      <div>Fullstack Developer</div>
      <div class="job-date">Oct 2019 – April 2026</div>
    </div>
    <div class="job-company">SIMRS TEN – Bekasi</div>
    <ul class="experience-list">
      <li><strong>Hospital Information Systems (SIMRS):</strong> Developed, maintained, and deployed systems for 7+ healthcare facilities, including RS. Amanda Mitra Keluarga, RS. Medirossa 2 Cibarusah, RS. Bhakti Husada Cikarang, RS. Fikri Medika Karawang, RS. Annisa Cikarang, and RS. PELNI Jakarta.</li>
      <li><strong>System Optimization:</strong> Resolved critical system bugs and optimized database performance, ensuring high system uptime for daily hospital operations.</li>
      <li><strong>API & Database Architecture:</strong> Built and integrated RESTful APIs and managed complex database architectures to support healthcare data management using PHP, MySQL, and SQL Server.</li>
      <li><strong>Mobile Development:</strong> Developed online hospital registration mobile applications for multiple healthcare facilities, enhancing patient accessibility and streamlining the appointment booking process.</li>
    </ul>

    <div class="job-title-row">
      <div>IT Helpdesk – Internship</div>
      <div>2018</div>
    </div>
    <div class="job-company">PT. Kabelindo Murni Tbk (PERSERO) – Jakarta</div>
    <ul class="experience-list">
      <li><strong>IT Support & Troubleshooting:</strong> Assisted with hardware and software troubleshooting for Personal Computers (PCs) across the company.</li>
      <li><strong>System Maintenance:</strong> Analyzed and maintained the Moodle Application Management Information System (MIS).</li>
      <li><strong>Daily Operations:</strong> Handled daily IT Support operations and provided prompt technical assistance to staff.</li>
    </ul>

    <div class="section-title">SKILLS</div>
    <table class="skills-table">
      <tr>
        <td>Programming Languages:</td>
        <td>PHP, JavaScript, Golang, Java</td>
      </tr>
      <tr>
        <td>Frameworks & Libraries:</td>
        <td>Laravel, React.js, Next.js, Inertia.js, Vite, Tailwind CSS, Framer Motion</td>
      </tr>
      <tr>
        <td>AI Agentic:</td>
        <td>Openclaw, Openhands, Gravity</td>
      </tr>
      <tr>
        <td>Databases & Cache:</td>
        <td>MySQL, SQL Server, PostgreSQL, Redis</td>
      </tr>
      <tr>
        <td>Tools & Methodologies:</td>
        <td>Docker, Git (GitHub Actions/CI-CD), Cloudflare Pages, Decap CMS, Hardware & Software Troubleshooting, Microsoft Office</td>
      </tr>
      <tr>
        <td>Languages:</td>
        <td>Indonesian (Native), English (Advanced)</td>
      </tr>
    </table>

    <div class="section-title">EDUCATION</div>
    <div class="school-row">
      <div>Bachelor of Information Technology</div>
      <div>2014 - 2019</div>
    </div>
    <div class="school-company">Mercu Buana University, Jakarta</div>
    <div class="school-details">
      • GPA: 3.60 / 4.00 (Cum Laude)
    </div>

    <div class="school-row">
      <div>Marketing (Accounting and Management)</div>
      <div>2011 - 2014</div>
    </div>
    <div class="school-company">SMK Negeri 51 Jakarta Timur</div>
    <br>

    <div class="section-title">TRAINING & CERTIFICATIONS</div>
    <ul class="cert-list">
      <li>Workshop of Machine Learning (Mercu Buana University, 2017)</li>
      <li>Web Programming Workshop (Mercu Buana University, 2017)</li>
    </ul>

  </div>
</body>
</html>
`;

(async () => {
  try {
    console.log('Generating CV pages using Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: generatedCvPdf,
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true
    });
    await browser.close();

    console.log('Loading generated CV pages and original PDF...');
    const newCvBytes = fs.readFileSync(generatedCvPdf);
    const originalPdfBytes = fs.readFileSync(originalPdfPath);

    const newCvDoc = await PDFDocument.load(newCvBytes);
    const originalDoc = await PDFDocument.load(originalPdfBytes);
    
    // Create final merged document
    const finalDoc = await PDFDocument.create();

    // Copy pages from the new HTML generated CV (all pages)
    const newPages = await finalDoc.copyPages(newCvDoc, newCvDoc.getPageIndices());
    for (const p of newPages) {
      finalDoc.addPage(p);
    }

    // Identify total pages in original to safely copy the transcript & diploma
    // Original has 4 pages. Pages index 2 and 3 are transcript and diploma.
    const originalPageCount = originalDoc.getPageCount();
    if (originalPageCount >= 4) {
      const pagesToCopy = [2, 3]; // Index 2 is Ijazah, Index 3 is Transcript in the current file
      console.log('Appending original documents (diploma then transcript)...');
      const appendedPages = await finalDoc.copyPages(originalDoc, pagesToCopy);
      for (const p of appendedPages) {
        finalDoc.addPage(p);
      }
    } else {
      console.log('Could not find page 3 and 4 in original PDF, saving without them.');
    }

    const pdfBytes = await finalDoc.save();
    fs.writeFileSync(finalPdfPath, pdfBytes);
    console.log('Final PDF successfully created at: ' + finalPdfPath);
  } catch (error) {
    console.error('Error:', error);
  }
})();
