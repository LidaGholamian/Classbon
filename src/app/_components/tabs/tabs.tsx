"use client";

import { useState } from "react";
import { TabsProps } from "./tabs.types";
import { Accordion } from "../accordion";

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tab-labels">
        {tabs.map((tab, index) => (
          <a
            key={`tab-${index}`}
            className={`tab-label ${index === activeTab ? "tab-active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          className="tab-content"
          key={`tab-content-${index}`}
          style={{ display: activeTab !== index ? "none" : "block" }}
        >
          {tab.type === "faq" && tab.faqData ? (
            tab.faqData.length > 0 ? (
              <Accordion data={tab.faqData} />
            ) : (
              <div className="text-center py-8 text-base-content/60">
                هیچ سوال متداولی موجود نیست.
              </div>
            )
          ) : typeof tab.content === "string" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: tab.content as TrustedHTML,
              }}
            />
          ) : (
            tab.content
          )}
        </div>
      ))}
    </div>
  );
};
