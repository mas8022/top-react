"use client";
import React, {
  memo,
  useState,
  useEffect,
  Suspense,
  useRef,
  useCallback,
} from "react";
import styles from "./ultraElem.module.css";

const useInView = ({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  triggerOnce = false,
} = {}) => {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState();
  const nodeRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && nodeRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setInView(entry.isIntersecting);
          setEntry(entry);
          if (entry.isIntersecting && triggerOnce) {
            observer.current.disconnect();
          }
        },
        {
          threshold,
          root,
          rootMargin,
        }
      );
      observer.current.observe(nodeRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [nodeRef.current]);

  const ref = useCallback((node) => {
    if (node) {
      nodeRef.current = node;
      if (observer.current) {
        observer.current.observe(node);
      }
    }
  }, []);

  return { ref, inView, entry };
};

const Loader = () => (
  <div className={styles.containerLoadingBox}>
    <div className={styles.loadingBox}></div>
  </div>
);

const Ue = memo(({ className: classes, children }) => {
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && inView && !loaded) {
      setLoaded(true);
    }
  }, [inView, loaded, isClient]);

  return (
    <div ref={ref} className={classes}>
      {loaded ? (
        <Suspense fallback={<Loader />}>{children}</Suspense>
      ) : (
        <Loader />
      )}
    </div>
  );
});

export { Ue };
