import React from "react";

import PageLayout from "../patterns/layouts/PageLayout";

import ProseContent from "../patterns/components/ProseContent";
import PageMetadata from "../patterns/components/PageMetadata";
import LinkComponent from "../patterns/elements/LinkComponent";

const PageNotFound = () => {
  return (
    <PageLayout>
      <PageMetadata
        title={ "Page Not Found" }
        description={ "404 - Page not Found" }
      />
      <main className="pt-7 pb-10 sm:pt-14 sm:pb-20">
        <ProseContent>
          <h1>404 - Page Not Found</h1>
          <p>
            The page you requested could not be found. It&apos;s possible you&apos;ve typed an incorrect
            URL or followed a dead link. If you think the page you tried to visit should exist
            then feel free to <LinkComponent url="/contact" text="Contact Me" />.
          </p>
          <p>
            Alternatively, why not check out my <LinkComponent url="/projects" text="Projects" /> or
            some <LinkComponent url="/blog" text="Articles" /> I&apos;ve written.
          </p>
        </ProseContent>
      </main>
    </PageLayout>
  );
};

export default PageNotFound;
