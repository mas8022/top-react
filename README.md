
# top-react

**`top-react`** is a powerful React library designed to enhance the performance, usability, and security of SSR (Server-Side Rendering) in Next.js applications. It offers several key components:

---

## Key Components

1. **`Ue` Provider**  
   A performance-boosting provider that delays the rendering of its children until the user scrolls to the element, improving site speed. It also displays a smooth animation if the content is slow to load, ensuring a great user experience even with weak internet connections.

2. **`useLocalStorage` Hook**  
   A custom hook that allows you to store and persist state in `localStorage`, making it easy to maintain state across page reloads.

3. **`useSanitizeInput` Hook**  
   A custom hook that sanitizes input to enhance the security of your application by preventing XSS attacks and other injection vulnerabilities.

4. **`GetVideoDuration` Component**  
   A component that extracts and provides the duration of an uploaded video file. It enhances user experience by allowing developers to easily handle video files in forms or standalone file inputs.

---

## Installation

To get started, install `top-react` using npm:

```bash
npm install top-react
```

---

## Usage

### 1. `Ue` Provider

The `Ue` provider enhances your site's performance by delaying the rendering of its children until the user scrolls to the element. If the user has a weak internet connection, a beautiful loading animation is displayed until the content is fully loaded.

#### Example:

```javascript
import React from "react";
import { Ue } from "top-react/ultraElem/ultraElem";

const App = () => {
  return (
    <div>
      <Ue>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsam
          libero maiores mollitia repudiandae fugit, excepturi laborum
          reiciendis quod iure.
        </div>
      </Ue>
    </div>
  );
};

export default App;
```

### 2. `useLocalStorage` Hook

The `useLocalStorage` hook allows you to easily store and persist state in the browser's `localStorage`. This is useful for maintaining state across page reloads.

#### Example:

```javascript
import React from 'react';
import { useLocalStorage } from "top-react/useLocalStorage/useLocalStorage";

const App = () => {
  const [count, setCount] = useLocalStorage("count", 0);

  return (
    <div>
      <button onClick={() => setCount(prev => prev + 1)}>increase</button>
      <span>{count}</span>
    </div>
  );
};

export default App;
```

### 3. `useSanitizeInput` Hook

The `useSanitizeInput` hook sanitizes input to prevent XSS attacks and other injection vulnerabilities, ensuring your application remains secure.

#### Example:

```javascript
import React, { useState } from "react";
import { useSanitizeInput } from "top-react/useSanitizeInput/useSanitizeInput";

export default function App() {
  const [testValue, setTestValue] = useState("");
  return (
    <div>
      <input
        type="text"
        value={testValue}
        onChange={(e) => setTestValue(useSanitizeInput(e.target.value))}
      />
    </div>
  );
}
```

### 4. `GetVideoDuration` Component

The `GetVideoDuration` component provides the duration of an uploaded video file. It can be used within a form or as a standalone file input handler. It enhances the user experience by automatically extracting and displaying the video duration.

#### Example:

```javascript
"use client"
import React, { useState } from "react";
import GetVideoDuration from "top-react/GetVideoDuration/GetVideoDuration";

export default function App() {
  const [testFile, setTestFile] = useState({});
  const [duration, setDuration] = useState(0);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setTestFile(e.currentTarget.files[0])}
      />
      <GetVideoDuration file={testFile} setDuration={setDuration} />
    </div>
  );
}
```

**Usage Tip**: Ensure that the `GetVideoDuration` component is placed after the file input in the form structure to ensure proper functionality.

---

## Conclusion

The `top-react` library provides you with tools to optimize your site's performance with delayed rendering and graceful loading animations, handle optimistic UI updates seamlessly, persist state in `localStorage`, ensure security through input sanitization, and easily extract video durations from uploaded files. With these components, you can ensure a smooth, responsive, secure, and feature-rich user experience in your Next.js applications.
