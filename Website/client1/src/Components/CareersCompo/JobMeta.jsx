import React from 'react';
import Head from 'next/head';

const JobMeta = ({ job, jobId }) => {
  const title = job ? `${job.title} | Careers at Mavenox` : 'Loading... | Mavenox';
  const description = job
    ? `Apply now for the position of ${job.title} at Mavenox in ${job.location}. Join our mission to innovate.`
    : 'Explore job openings at Mavenox. Grow your career with us.';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`Mavenox, Careers, ${job?.title}, ${job?.location}`} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://www.mavenox.com/careers/${jobId}`} />
      <meta property="og:image" content="https://www.mavenox.com/og-careers.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.mavenox.com/og-careers.jpg" />
      <link rel="canonical" href={`https://www.mavenox.com/careers/${jobId}`} />
    </Head>
  );
};

export default JobMeta;
