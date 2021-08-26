import { useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Textarea } from '@chakra-ui/core';
import useSWR, { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import Fetcher from '@/utils/fetcher';
import Feedback from '@/components/Feedback';
import SiteHeader from '@/components/SiteHeader';
import LoginButtons from '@/components/LoginButtons';
import DashboardShell from '@/components/DashboardShell';

const FeedbackPage = () => {
  const { user, loading } = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/site/${siteId}`, Fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, Fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };

    inputEl.current.value = '';
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback]
      }),
      false
    );
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        id='submit-feedback'
        isDisabled={!siteData || !feedbackData}
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
        isSiteOwner={site?.authorId === user?.uid}
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
              isDisabled={!user}
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
