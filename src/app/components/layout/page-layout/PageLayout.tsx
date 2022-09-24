import classNames from "classnames";
import React, { useState } from "react";

import styles from "./PageLayout.module.css";
const { container, pageContainer, pageContainerDecor, content, hrClass } =
  styles;

type PageLayoutProps = {
  children: JSX.Element | React.ReactNode | React.ReactElement;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={classNames(pageContainer)}>
      <div className={classNames(pageContainerDecor)}>
        <div className={classNames(container)}>
          <div className={classNames(content)}>
            {/* <hr className={classNames(hrClass)} /> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
