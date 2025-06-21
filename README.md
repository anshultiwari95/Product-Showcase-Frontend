# 🛍️ Product Showcase App — Frontend

This is the frontend of the **Product Showcase** app built using **Next.js**, **Tailwind CSS**, and **Framer Motion**. It interacts with a custom Express.js backend (proxying the DummyJSON API) to display products with rich animations, sorting, pagination, and more.

---

## 🔗 Live Links

- **Frontend Live**: [https://product-showcase-frontend.vercel.app](https://product-showcase-frontend.vercel.app)
- **Frontend GitHub**: [https://github.com/anshultiwari95/Product-Showcase-Frontend](https://github.com/anshultiwari95/Product-Showcase-Frontend)
- **Backend Live**: [https://product-showcase-backend.onrender.com](https://product-showcase-backend.onrender.com)
- **Backend GitHub**: [https://github.com/anshultiwari95/Product-Showcase-Backend](https://github.com/anshultiwari95/Product-Showcase-Backend)

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/anshultiwari95/Product-Showcase-Frontend.git
cd Product-Showcase-Frontend

2. Install Dependencies
npm install

3.Update Backend URL
Edit the file components/lib/api.js and replace the base URL with:
const BASE_URL = "https://product-showcase-backend.onrender.com/api";

4.Start Development Server
npm run dev


5.Design Choices & Trade-offs
Chose Framer Motion over GSAP for smoother integration with React and for layoutId-based shared transitions.

For sorting, the backend fetches all products first, sorts them in memory, and then paginates — ensuring consistent results across all items. This approach sacrifices performance slightly for accuracy and better UX.

Implemented in-memory caching in backend to avoid redundant calls to DummyJSON API.

Used Tailwind CSS for a utility-first approach and faster UI development.

6.Third-party Libraries Used

Library	      Purpose
Framer        Motion	Animations, shared transitions, micro-interactions
Axios	      API requests
TailwindCSS	  Responsive, utility-first styling

7.Bonus Features Implemented
A. Advanced Animation Showcase

Shared element transitions using layoutId (product list → detail view)

spring-based transitions for hover and tap animations

Swipe and keyboard support for image carousel

Scroll-triggered entrance animations using useInView

Tab transitions and button interactions with motion effects

Thumbnail hover zoom and selection border indicator

B.In-Memory Caching

Product list (with sorting & categories) is cached on the backend for 5 minutes

Categories also cached to reduce redundant fetches

C. Consistent Sorting with Pagination

Sorting by price (low to high / high to low) works across all items

Even when paginated or filtered by category




Author
Anshul Tiwari

📧 anshul.tiwari1223@gmail.com

🔗 https://www.linkedin.com/in/tiwari-anshul12/

🌐 https://anshul-tiwari-portfolio.vercel.app/