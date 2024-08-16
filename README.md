# top-react

**`top-react`** is a powerful React library designed to enhance the performance and usability of SSR (Server-Side Rendering) in Next.js applications. It offers two key components:

1. **`ServerButton`**: A specialized button component that handles form submissions in SSR environments, making it easier to trigger server-side actions directly from user interactions.
  
2. **`Ue` Provider**: A performance-boosting provider that delays the rendering of its children until the user scrolls to the element, improving site speed. It also displays a smooth animation if the content is slow to load, ensuring a great user experience even with weak internet connections.

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
import connectToDb from "../../configs/db";
import testModel from '@/../model/test';
import { ServerButton } from "top-react/serverButton/server";

export default async function Home() {
  const action = async () => {
    "use server";
    console.log("Button Clicked!");

    connectToDb();
    await testModel.create({name: "mohammad", email: "mas@gmail.com"});
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ServerButton onClick={action} />
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

### Detailed Explanation

- **`ServerButton`**: 
  - **Purpose**: To solve the challenge of triggering server-side logic from buttons in SSR pages.
  - **How It Works**: The `ServerButton` wraps the server-side action in a form submission, which is triggered when the button is clicked. This ensures that the server-side code runs as expected in SSR contexts.

- **`Ue` Provider**: 
  - **Purpose**: To improve the perceived performance of your site by delaying rendering and showing a loading animation for slow connections.
  - **How It Works**: The `Ue` provider checks when the user scrolls to the element it wraps. It only renders the element at that point, which can greatly reduce the initial load time. If the internet connection is slow, it displays a loading animation until the content is ready.

## Conclusion

The `top-react` library provides you with tools to manage SSR form submissions easily and optimize your site's performance with delayed rendering and graceful loading animations. With these components, you can ensure a smooth and responsive user experience in your Next.js applications.
