# Paygilant Home Assignment

## Setup and Run Instructions

## Description

This is a client-side React project that allows users to **show, filter, and create posts** using the [JSONPlaceholder posts API](https://jsonplaceholder.typicode.com/posts).

---

## Features

- View a list of posts fetched from the JSONPlaceholder API
- Filter posts based on search or criteria
- Create new posts (client-side only, simulated)
- Responsive UI with support for light and dark themes
- Client-side routing for seamless navigation between pages

- The app supports **day and night modes**
- The app has client side pagination

---

## Client-Side Routes

This project uses React Router for navigation with the following routes:

| Path         | Component             | Description                        |
| ------------ | --------------------- | ---------------------------------- |
| `/`          | Redirects to `/posts` | Root redirects to posts listing    |
| `/posts`     | `PostsPage`           | Displays the list of posts         |
| `/posts/:id` | `SinglePostPage`      | Displays details for a single post |

---

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) installed

---

### Installation

1. Clone the repository (if you haven't already):

   ```bash
   git clone https://github.com/DanielBretts/PostFeedFrontend.git
   cd PostFeedFrontend
   ```

2. Install all project dependencies:

```bash
npm install
```

---

### Running the project

To start the project, run:

```bash
npm run dev
```

---

### Building the project

To build the project, run:

```bash
npm run build
```

---

## Credits

This project uses components from [shadcn/ui](https://ui.shadcn.com), an open-source component library built on Radix UI and Tailwind CSS.
