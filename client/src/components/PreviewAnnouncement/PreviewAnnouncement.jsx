import { useMemo, useState } from "react";
import {
  DotButton,
  PreviewCard,
  PreviewCategory,
  PreviewDescription,
  PreviewDots,
  PreviewFooterButton,
  PreviewHeaderIcon,
  PreviewOption,
  PreviewOptionBadge,
  PreviewOptionList,
  PreviewTitle,
} from "./PreviewAnnouncement.js";

const PreviewAnnouncement = ({ announcement }) => {
  const [activePage, setActivePage] = useState(0);
  const pages = useMemo(
    () => chunkSubAnnouncements(announcement?.option || [], 2),
    [announcement?.option],
  );
  const visibleSubAnnouncements = pages[activePage] || [];

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const startX = Number(event.currentTarget.dataset.startX || touch.clientX);
    const distance = startX - touch.clientX;

    if (Math.abs(distance) < 40 || pages.length <= 1) return;

    setActivePage((currentPage) => {
      if (distance > 0) {
        return Math.min(currentPage + 1, pages.length - 1);
      }

      return Math.max(currentPage - 1, 0);
    });
  };

  return (
    <PreviewCard
      onTouchStart={(event) => {
        event.currentTarget.dataset.startX = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <PreviewHeaderIcon>
        <span />
      </PreviewHeaderIcon>
      <PreviewCategory>Announcement</PreviewCategory>
      <PreviewTitle>{announcement?.title || "Scheduled Maintenance"}</PreviewTitle>
      <PreviewDescription>
        {announcement?.description ||
          "The site will be undergoing scheduled maintenance today. We appreciate your patience."}
      </PreviewDescription>

      <PreviewOptionList>
        {visibleSubAnnouncements.map((item, index) => (
          <PreviewOption key={`${item.title}-${index}`}>
            <PreviewOptionBadge>{activePage * 2 + index + 1}</PreviewOptionBadge>
            <div>
              <strong>{item.title || "Temporary Outage"}</strong>
              <span>
                {item.description ||
                  "All services will be temporarily inaccessible."}
              </span>
            </div>
          </PreviewOption>
        ))}
      </PreviewOptionList>

      {pages.length > 1 && (
        <PreviewDots>
          {pages.map((_, index) => (
            <DotButton
              key={index}
              type="button"
              $active={index === activePage}
              aria-label={`Show preview page ${index + 1}`}
              onClick={() => setActivePage(index)}
            />
          ))}
        </PreviewDots>
      )}

      <PreviewFooterButton type="button">Got It</PreviewFooterButton>
    </PreviewCard>
  );
};

const chunkSubAnnouncements = (items, size) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks.length ? chunks : [[]];
};

export default PreviewAnnouncement;
