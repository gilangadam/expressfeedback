import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  IconButton,
  Box,
  Button
} from '@chakra-ui/core';

import { deleteSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const DeleteSiteButton = ({ siteId, index }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteSite(siteId);
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId)
        };
      },
      false
    );
    onClose();
  };

  return (
    <Box id={`delete-site-button-icon-${index}`}>
      <IconButton
        aria-label="Delete Site"
        icon="delete"
        variant="link"
        variantColor="red"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Site
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This will also delete all feedback left on the site.
              You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                id={`delete-site-button-confirm-${index}`}
                fontWeight="bold"
                variantColor="red"
                onClick={onDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DeleteSiteButton;
