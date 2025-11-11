import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function generatePDF(pathname: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
    executablePath: process.env.CHROME_EXECUTABLE_PATH || undefined,
  });

  const page = await browser.newPage();
  
  // Construct the full URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fullUrl = `${baseUrl}${pathname}`;

  await page.goto(fullUrl, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  // Wait for content to render
  await page.waitForSelector('article', { timeout: 5000 }).catch(() => {});

  // Generate PDF
  const pdfBuffer = await page.pdf({
    width: 950,
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
    format: 'A4',
  });

  await browser.close();
  return pdfBuffer;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pathname = searchParams.get('pathname');
    const filename = searchParams.get('filename');

    if (!pathname) {
      return NextResponse.json(
        { error: 'Pathname is required' },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePDF(pathname);

    // Generate filename from pathname
    const pdfFilename = filename || pathname.slice(1).replaceAll('/', '-') || 'page';

    // Return PDF as downloadable file
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pdfFilename}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { pathname } = await req.json();

    if (!pathname) {
      return NextResponse.json(
        { error: 'Pathname is required' },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePDF(pathname);

    // Generate filename from pathname
    const filename = pathname.slice(1).replaceAll('/', '-') || 'page';

    // Return PDF as downloadable file
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
