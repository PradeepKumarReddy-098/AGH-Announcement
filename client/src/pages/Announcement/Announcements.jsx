import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionButton,
  ActionsCell,
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

const API_URL = "http://localhost:5000/api/announcements/admin";
const ANNOUNCEMENT_API_URL = "http://localhost:5000/api/announcements";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
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

        setAnnouncements(Array.isArray(data) ? data : data.data || []);
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

  const hasAnnouncements = announcements.length > 0;

  return (
    <PageShell>
      <ToastContainer aria-live="polite" aria-atomic="true">
        {toast && (
          <ToastMessage $type={toast.type} role="status">
            {toast.message}
          </ToastMessage>
        )}
      </ToastContainer>

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

export default Announcements;
