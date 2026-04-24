import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard.jsx";
import {
  AddButton,
  BackButton,
  DeleteButton,
  ErrorText,
  Field,
  FieldGrid,
  FormBody,
  FormCard,
  FormSection,
  FormTextarea,
  FormTitle,
  Input,
  Label,
  PageShell,
  PreviewButton,
  PreviewFrame,
  SectionHeader,
  SectionTitle,
  SubmitButton,
  SubmitSpinner,
  SubAnnouncementCard,
  Switch,
  SwitchInput,
  TabButton,
  Tabs,
  ToastContainer,
  ToastMessage,
  ToggleRow,
} from "./CreateAnnouncement.js";

const API_URL = "https://backend-announcements.onrender.com/api/announcements";

const defaultValues = {
  title: "",
  description: "",
  isPublish: false,
  option: [],
};

const getAnnouncementFormValues = (announcement) => ({
  title: announcement?.title || "",
  description: announcement?.description || "",
  isPublish: Boolean(announcement?.isPublish),
  option:
    announcement?.option?.length > 0
      ? announcement.option.map((item) => ({
          title: item.title || "",
          description: item.description || "",
        }))
      : defaultValues.option,
});

const CreateAnnouncement = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [submitError, setSubmitError] = useState("");
  const [toast, setToast] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const isEditMode = Boolean(announcementId);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "option",
  });

  const watchedAnnouncement = useWatch({ control }) || defaultValues;

  useEffect(() => {
    const routeAnnouncement = location.state?.announcement;

    if (!isEditMode) {
      reset(defaultValues);
      return;
    }

    if (routeAnnouncement) {
      reset(getAnnouncementFormValues(routeAnnouncement));
      return;
    }

    let isMounted = true;

    fetch(`${API_URL}/${announcementId}`)
      .then((response) =>
        response.json().then((result) => {
          if (!response.ok || result?.success === false) {
            throw new Error(
              result?.message || result?.error || "Unable to load announcement",
            );
          }

          return result;
        }),
      )
      .then((result) => {
        if (!isMounted) return;

        reset(getAnnouncementFormValues(result.data));
      })
      .catch((error) => {
        if (!isMounted) return;

        const errorMessage =
          error.message || "Unable to load announcement for editing.";
        setSubmitError(errorMessage);
        setToast({
          type: "error",
          message: errorMessage,
        });
      });

    return () => {
      isMounted = false;
    };
  }, [announcementId, isEditMode, location.state, reset]);

  useEffect(() => {
    if (!toast) return undefined;

    const toastTimer = window.setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => window.clearTimeout(toastTimer);
  }, [toast]);

  const handleAddSubAnnouncement = () => {
    append({ title: "", description: "" });
    setActiveTab("form");
  };

  const handlePreviewTab = () => {
    setActiveTab("preview");
  };

  const handleBack = () => {
    navigate("/announcements");
  };

  const submitAnnouncement = async (formData) => {
    setSubmitError("");
    setToast(null);

    const payload = {
      title: formData.title,
      description: formData.description,
      isPublish: formData.isPublish,
      option: formData.option.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    };

    try {
      const response = await fetch(
        isEditMode ? `${API_URL}/${announcementId}` : API_URL,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || result?.error || "Unable to save announcement",
        );
      }

      const savedAnnouncement = result;
      setToast({
        type: "success",
        message: isEditMode
          ? "Announcement updated successfully."
          : savedAnnouncement.message || "Announcement submitted successfully.",
      });

      if (isEditMode) {
        navigate("/announcements");
      } else {
        reset(defaultValues);
      }
    } catch (error) {
      const errorMessage =
        error.message === "Failed to fetch"
          ? "Unable to reach the backend. Please make sure the server is running on port 5000."
          : error.message ||
            "Announcement submission failed. Please try again.";

      setSubmitError(errorMessage);
      setToast({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <PageShell>
      <ToastContainer aria-live="polite" aria-atomic="true">
        {toast && (
          <ToastMessage $type={toast.type} role="status">
            {toast.message}
          </ToastMessage>
        )}
      </ToastContainer>

      <Tabs>
        <TabButton
          type="button"
          $active={activeTab === "form"}
          onClick={() => setActiveTab("form")}
        >
          Form
        </TabButton>
        <TabButton
          type="button"
          $active={activeTab === "preview"}
          onClick={handlePreviewTab}
        >
          Preview
        </TabButton>
      </Tabs>

      {activeTab === "form" ? (
        <FormBody onSubmit={handleSubmit(submitAnnouncement)}>
          <FormCard>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter announcement title..."
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 25,
                    message: "Title cannot exceed 25 characters",
                  },
                })}
              />
              {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <FormTextarea
                id="description"
                placeholder="Provide context or instructions..."
                rows={6}
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 80,
                    message: "Description cannot exceed 80 characters",
                  },
                })}
              />
              {errors.description && (
                <ErrorText>{errors.description.message}</ErrorText>
              )}
            </Field>
          </FormCard>

          <FormSection>
            <SectionHeader>
              <SectionTitle>Sub-announcements</SectionTitle>
              <AddButton type="button" onClick={handleAddSubAnnouncement}>
                + Add Sub-announcement
              </AddButton>
            </SectionHeader>

            {fields.map((field, index) => (
              <SubAnnouncementCard key={field.id}>
                <FieldGrid>
                  <Field>
                    <Label htmlFor={`option.${index}.title`}>
                      Sub-announcement Title
                    </Label>
                    <Input
                      id={`option.${index}.title`}
                      placeholder="Sub-announcement Title"
                      {...register(`option.${index}.title`, {
                        required: "Sub-announcement title is required",
                        maxLength: {
                          value: 20,
                          message:
                            "Sub-announcement title cannot exceed 20 characters",
                        },
                      })}
                    />
                    {errors.option?.[index]?.title && (
                      <ErrorText>
                        {errors.option[index].title.message}
                      </ErrorText>
                    )}
                  </Field>

                  <Field>
                    <Label htmlFor={`option.${index}.description`}>
                      Short Description
                    </Label>
                    <Input
                      id={`option.${index}.description`}
                      placeholder="Short Description"
                      {...register(`option.${index}.description`, {
                        required: "Short description is required",
                        maxLength: {
                          value: 50,
                          message:
                            "Sub-announcement description cannot exceed 50 characters",
                        },
                      })}
                    />
                    {errors.option?.[index]?.description && (
                      <ErrorText>
                        {errors.option[index].description.message}
                      </ErrorText>
                    )}
                  </Field>
                </FieldGrid>

                <DeleteButton type="button" onClick={() => remove(index)}>
                  x
                </DeleteButton>
              </SubAnnouncementCard>
            ))}
          </FormSection>

          <ToggleRow>
            <div>
              <FormTitle>Publish Now</FormTitle>
              <p>
                Make this announcement visible immediately after submitting.
              </p>
            </div>
            <Switch>
              <SwitchInput type="checkbox" {...register("isPublish")} />
              <span />
            </Switch>
          </ToggleRow>

          {submitError && <ErrorText>{submitError}</ErrorText>}

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting && <SubmitSpinner aria-hidden="true" />}
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
                ? "Update Announcement"
                : "Submit Announcement"}
          </SubmitButton>

          <BackButton type="button" onClick={handleBack}>
            Back to announcements
          </BackButton>
        </FormBody>
      ) : (
        <PreviewFrame>
          <AnnouncementCard announcement={watchedAnnouncement} />
          <PreviewButton type="button" onClick={() => setActiveTab("form")}>
            Edit Form
          </PreviewButton>
        </PreviewFrame>
      )}
    </PageShell>
  );
};

export default CreateAnnouncement;
