
# top-react

**`top-react`** is a powerful React library designed to enhance the performance and usability of SSR (Server-Side Rendering) in Next.js applications. It offers three key components:

---

## Key Components

1. **`ServerButton`**: 
   - A specialized button component that handles form submissions in SSR environments, making it easier to trigger server-side actions directly from user interactions.
  
2. **`Ue` Provider**: 
   - A performance-boosting provider that delays the rendering of its children until the user scrolls to the element, improving site speed. It also displays a smooth animation if the content is slow to load, ensuring a great user experience even with weak internet connections.

3. **`useLocalStorage` Hook**: 
   - A custom hook that allows you to store and persist state in `localStorage`, making it easy to maintain state across page reloads.

---

## Installation

To get started, install `top-react` using npm:

```bash
npm install top-react
```

---

## Usage

### 1. `ServerButton` Component

The `ServerButton` component is designed to handle server-side form submissions in SSR pages. It wraps your server-side action in a form and submits it upon clicking the button.

#### Example:

```javascript
import React from "react";
import connectToDb from "../../configs/db";
import testModel from "@/../model/test";
import { ServerButton } from "top-react/serverButton/server";

export default async function Home() {
  const action = async () => {
    "use server";
    console.log("Button Clicked!");

    connectToDb();
    await testModel.create({ name: "mohammad", email: "mas@gmail.com" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ServerButton onClick={action}>
        <button>click</button>
      </ServerButton>
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

---

## Detailed Explanation

- **`ServerButton`**: 
  - **Purpose**: To solve the challenge of triggering server-side logic from buttons in SSR pages.
  - **How It Works**: The `ServerButton` wraps the server-side action in a form submission, which is triggered when the button is clicked. This ensures that the server-side code runs as expected in SSR contexts.

- **`Ue` Provider**: 
  - **Purpose**: To improve the perceived performance of your site by delaying rendering and showing a loading animation for slow connections.
  - **How It Works**: The `Ue` provider checks when the user scrolls to the element it wraps. It only renders the element at that point, which can greatly reduce the initial load time. If the internet connection is slow, it displays a loading animation until the content is ready.

- **`useLocalStorage` Hook**: 
  - **Purpose**: To persist state in `localStorage` so that it remains even after a page reload.
  - **How It Works**: The `useLocalStorage` hook returns the current value and a setter function. The value is stored in `localStorage`, and any updates to the state are automatically synced with it.

---

## Conclusion

The `top-react` library provides you with tools to manage SSR form submissions easily, optimize your site's performance with delayed rendering and graceful loading animations, and persist state in `localStorage`. With these components, you can ensure a smooth and responsive user experience in your Next.js applications.
