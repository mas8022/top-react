
# top-react

**`top-react`** is a powerful React library designed to enhance the performance and usability of SSR (Server-Side Rendering) in Next.js applications. It offers various components and hooks that can help improve the user experience and site performance.

## Installation

To get started, install `top-react` using npm:

```bash
npm install top-react
```

## Usage

### 1. `ServerButton` Component

The `ServerButton` component is designed to handle server-side form submissions in SSR pages. It wraps your server-side action in a form and submits it upon clicking the button.

#### Example:

```javascript
import React from "react";
import { ServerButton } from "top-react/ServerButton/ServerButton";

export default function App() {
  let testValue = 0;

  const testFunction = async () => {
    "use server";
    console.log("this message shows in server");
  };

  return (
    <>
      <ServerButton onClick={testFunction}>click</ServerButton>
    </>
  );
}
```

#### Example with Parameters:

```javascript
import React from "react";
import { ServerButton } from "top-react/ServerButton/ServerButton";

export default function App() {
  let testValue = 0;

  const testFunction = (testValue) => async () => {
    "use server";
    console.log("this value shows in server", testValue);
  };

  return (
    <div>
      <ServerButton onClick={testFunction(testValue)}>click</ServerButton>
    </div>
  );
}
```

### 2. `Ue` Provider

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

### 3. `useLocalStorage` Hook

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

### 4. `useSanitizeInput` Hook

The `useSanitizeInput` hook sanitizes user inputs to enhance security by preventing potential XSS (Cross-Site Scripting) attacks.

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

### 5. `GetVideoDuration` Function

The `GetVideoDuration` function takes an uploaded video file and returns the duration of the video.

#### Example:

```javascript
"use client";
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

### 6. `useOnline` Hook

The `useOnline` hook detects whether the user is online or offline in real-time. Note that this hook can only be used on client-side rendered (CSR) pages and requires the `"use client"` directive at the top of the file.

#### Example:

```javascript
"use client";
import React from "react";
import { useOnline } from "top-react/useOnline/useOnline";

export default function App() {
  const isOnline = useOnline();

  return <div>{isOnline ? "You are online" : "You are offline"}</div>;
}
```

## Conclusion

The `top-react` library provides you with tools to manage SSR form submissions easily, optimize your site's performance with delayed rendering and graceful loading animations, handle optimistic UI updates seamlessly, sanitize user inputs for security, obtain video durations, and track online/offline status. With these components, you can ensure a smooth and responsive user experience in your Next.js applications.
