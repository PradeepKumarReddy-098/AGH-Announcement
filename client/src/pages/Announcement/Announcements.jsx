import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionButton,
  ActionsCell,
  ConfirmActions,
  ConfirmButton,
  ConfirmDialog,
  ConfirmOverlay,
  CreateButton,
  EmptyState,
  ErrorMessage,
  MobileActions,
  PageActions,
  PageShell,
  PageContent,
  PageTitle,
  StatusBadge,
  Table,
  TableCard,
  TableHeader,
  TableScroll,
  ToastContainer,
  ToastMessage,
} from "./AnnouncementsStyle";

const ANNOUNCEMENT_API_URL =
  import.meta.env.VITE_ANNOUNCEMENT_API_URL ||
  "http://localhost:5000/api/announcements";
const API_URL = `${ANNOUNCEMENT_API_URL}/admin`;

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [publishTarget, setPublishTarget] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!toast) return undefined;

    const toastTimer = window.setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => window.clearTimeout(toastTimer);
  }, [toast]);

  useEffect(() => {
    let isMounted = true;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch announcements");
        }

        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;

        setAnnouncements(sortAnnouncements(Array.isArray(data) ? data : data.data || []));
      })
      .catch(() => {
        if (!isMounted) return;

        setAnnouncements([]);
      })
      .finally(() => {
        if (!isMounted) return;

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);


  const handleDeleteAnnouncement = async (announcementId) => {
    setError("");
    setToast(null);

    try {
      const response = await fetch(`${ANNOUNCEMENT_API_URL}/${announcementId}`, {
        method: "DELETE",
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || result?.error || "Unable to delete announcement",
        );
      }

      setAnnouncements((currentAnnouncements) =>
        currentAnnouncements.filter(
          (announcement) => getAnnouncementId(announcement) !== announcementId,
        ),
      );
      setToast({
        type: "success",
        message: result?.message || "Announcement deleted successfully.",
      });
    } catch (deleteError) {
      const errorMessage =
        deleteError.message || "Announcement delete failed. Please try again.";

      setError(errorMessage);
      setToast({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const handleEditAnnouncement = (announcement) => {
    navigate(`/edit-announcement/${getAnnouncementId(announcement)}`, {
      state: { announcement },
    });
  };

  const handlePublishAnnouncement = async () => {
    if (!publishTarget) return;

    setError("");
    setToast(null);
    setIsPublishing(true);

    try {
      const response = await fetch(
        `${ANNOUNCEMENT_API_URL}/${getAnnouncementId(publishTarget)}/publish`,
        {
          method: "PATCH",
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || result?.error || "Unable to publish announcement",
        );
      }

      if (Array.isArray(result?.announcements)) {
        setAnnouncements(result.announcements);
      } else {
        setAnnouncements((currentAnnouncements) =>
          sortAnnouncements(
            currentAnnouncements.map((announcement) => ({
              ...announcement,
              isPublish:
                getAnnouncementId(announcement) === getAnnouncementId(publishTarget),
              isPublished:
                getAnnouncementId(announcement) === getAnnouncementId(publishTarget),
            })),
          ),
        );
      }

      setToast({
        type: "success",
        message: result?.message || "Announcement published successfully.",
      });
      setPublishTarget(null);
    } catch (publishError) {
      const errorMessage =
        publishError.message || "Announcement publish failed. Please try again.";

      setError(errorMessage);
      setToast({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const hasAnnouncements = announcements.length > 0;
  const publishedAnnouncement = announcements.find(
    (announcement) => announcement.isPublish,
  );

  return (
    <PageShell>
      <ToastContainer aria-live="polite" aria-atomic="true">
        {toast && (
          <ToastMessage $type={toast.type} role="status">
            {toast.message}
          </ToastMessage>
        )}
      </ToastContainer>

      {publishTarget && (
        <ConfirmOverlay>
          <ConfirmDialog role="dialog" aria-modal="true">
            <h2>Publish this announcement?</h2>
            <p>
              {publishedAnnouncement
                ? `You already have "${publishedAnnouncement.title}" published. Publishing "${publishTarget.title}" will unpublish it and make the current announcement live.`
                : `Publishing "${publishTarget.title}" will make it visible to users.`}
            </p>
            <ConfirmActions>
              <ConfirmButton
                type="button"
                onClick={() => setPublishTarget(null)}
                disabled={isPublishing}
              >
                Cancel
              </ConfirmButton>
              <ConfirmButton
                type="button"
                $primary
                onClick={handlePublishAnnouncement}
                disabled={isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </ConfirmButton>
            </ConfirmActions>
          </ConfirmDialog>
        </ConfirmOverlay>
      )}

      <PageContent>
        {isLoading ? (
          <EmptyState>Loading announcements...</EmptyState>
        ) : !hasAnnouncements ? (
          <>
            <EmptyState>
              <h2>No Announcements are available.</h2>
              <span>Create Announcements to display.</span>
              <PageActions>
              <CreateButton type="button" onClick={()=>navigate("/create-announcement")}>
                + Create Announcement
              </CreateButton>
            </PageActions>
            </EmptyState>
          </>
        ) : (
          <>
            <PageActions>
              <CreateButton type="button" onClick={()=>navigate("/create-announcement")}>
                + Create Announcement
              </CreateButton>
            </PageActions>

            <PageTitle>All Announcements</PageTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TableCard>
              <TableScroll>
                <Table>
                  <TableHeader>
                    <tr>
                      <th>Announcement Title</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </TableHeader>

                  <tbody>
                    {announcements.map((announcement) => {
                      const announcementId = getAnnouncementId(announcement);

                      return (
                        <tr key={announcementId}>
                          <td data-label="Announcement Title">
                            {announcement.title}
                          </td>
                          <td data-label="Status">
                            <StatusBadge $published={announcement.isPublish}>
                              <span />
                              {announcement.isPublish ? "Published" : "Draft"}
                            </StatusBadge>
                          </td>
                          <ActionsCell data-label="Actions">
                            <MobileActions>
                              <ActionButton
                                type="button"
                                onClick={() =>
                                  handleEditAnnouncement(announcement)
                                }
                              >
                                Edit
                              </ActionButton>
                              {!announcement.isPublish && (
                                <ActionButton
                                  $success
                                  type="button"
                                  onClick={() => setPublishTarget(announcement)}
                                >
                                  Publish
                                </ActionButton>
                              )}
                              <ActionButton
                                $danger
                                type="button"
                                onClick={() =>
                                  handleDeleteAnnouncement(announcementId)
                                }
                              >
                                Delete
                              </ActionButton>
                            </MobileActions>
                          </ActionsCell>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </TableScroll>
            </TableCard>
          </>
        )}
      </PageContent>
    </PageShell>
  );
};

const getAnnouncementId = (announcement) => announcement._id || announcement.id;

const sortAnnouncements = (items) =>
  [...items].sort((first, second) => {
    if (first.isPublish !== second.isPublish) {
      return first.isPublish ? -1 : 1;
    }

    return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
  });

export default Announcements;
