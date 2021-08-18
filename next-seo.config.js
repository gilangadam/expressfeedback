const title =
  'Express Feedback – The easiest way to add comments or reviews to your static site.';
const description = 'Express Feedback is built by Gilang Adam with guidance from React 2025.';

const SEO = {
  title,
  description,
  canonical: 'https://expressfeedback.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://expressfeedback.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://expressfeedback.vercel.app/og.png',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
};

export default SEO;