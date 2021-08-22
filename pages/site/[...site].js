import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Input, Textarea } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import SiteHeader from '@/components/SiteHeader';
import LoginButtons from '@/components/LoginButtons';
import DashboardShell from '@/components/DashboardShell';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const FeedbackPage = ({ initialFeedback, site }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };

    inputEl.current.value = '';
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        isDisabled={router.isFallback}
        color="white"
        backgroundColor="gray.900"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={true}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Box
        backgroundColor="gray.100"
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth={['320px', '425px', '768px', '75%']}
        mx={4}
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              h="100px"
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>
        <Box
          bg="white"
          display="flex"
          flexDirection="column"
          width="full"
          borderRadius={4}
          px={4}
          pt={8}
          mb={8}
        >
          {allFeedback &&
            allFeedback.map((feedback, index) => (
              <Feedback
                key={feedback.id}
                settings={site?.settings}
                isLast={index === allFeedback.length - 1}
                {...feedback}
              />
            ))}
        </Box>
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
