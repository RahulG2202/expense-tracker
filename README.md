# 🎓 Institutional Partnership Expense Tracker

A Specialized Expense Tracker CRM for University-Community Engagement
The Partnership Funding Tracker is a production-grade, single-page application designed for institutional offices (such as ASU’s Office of University Affairs) to manage, track, and approve funding requests for community partnerships.

Moving away from a generic expense tracker, this application is built as a Workflow Management System. It allows faculty and staff to submit funding requests, while administrators can oversee the budget through an interactive Kanban board, ensuring transparency and accountability in university-community collaborations.

# 🛠️ Tech Stack & Core Packages

To ensure scalability and a premium user experience, the following industry-standard packages were utilized:

- **State Management:** Redux Toolkit (Global State) & Redux Persist (LocalStorage persistence).

- **User Interface:** React 19 with Vite for lightning-fast builds.

- **Styling:** Tailwind CSS (Utility-first CSS) with a custom "Deep Purple" institutional palette.

- **Interactivity:** @hello-pangea/dnd (for smooth Kanban drag-and-drop).

- **Navigation:** React Router v7 for seamless client-side routing.

- **Data Visualization:** Chart.js & react-chartjs-2 for real-time budget analytics.

- **Experience:** React-Toastify for non-blocking notifications.

- **API Layer:** Axios with custom interceptors for professional middleware handling.

# 🔄 Application Flow

- **Request Initiation:** Users click "New Expense" to open a modal-based form. They enter details such as Partnership Name, Department, and Amount.

- **Workflow Oversight:** New requests land in the "Approval Pending" column. Administrators can drag cards to "Approved" or "Sent for Correction" to update their status in real-time.

- **Detailed Inspection:** Clicking any card opens an Expanded View, allowing reviewers to read justifications. Users can switch to Edit Mode directly from this view.

- **Resource Management:** Users can delete requests with a Secondary Consent Modal to prevent accidental data loss.

- **Analytical Insights:** The top-level dashboard provides a Pie Chart breakdown of the budget, helping leaders see exactly where funds are being distributed by category.

- **Quick Retrieval:** Integrated Search & Filtering allows users to find specific requests by Title or ID instantly.

### Note: The application comes pre-loaded with Institutional Dummy Data to demonstrate the workflow across all statuses immediately.

# 🌟 Key Features & Engineering Excellence

- **🎯 Professional Drag & Drop:** Implemented a Kanban-style interface with persistent reordering logic within and across columns.

- **🔍 Search with Debouncing:** Optimized search performance using a custom useDebounce hook, preventing unnecessary re-renders during rapid typing.

- **🛡️ Global Error Boundaries:** Wrapped the application in a React Error Boundary to catch runtime errors gracefully, ensuring the app never crashes for the end-user.

- **🚀 Axios Interceptors:** Pre-configured service layer that acts as middleware for future backend integration (handling tokens, global error toasts, and base URLs).

- **🧩 Atomic Common Components:** Developed a library of reusable form fields (Input, Select, Textarea) to ensure UI consistency and reduce code duplication.

- **💾 State Persistence:** Used Redux-Persist to ensure the partnership data survives page refreshes, providing a seamless "Desktop App" experience.

- **📂 Clean Architecture:** Followed a strict folder structure (@/components, @/store, @/hooks, @/utils) with Absolute Pathing for maximum maintainability.

- **🔄 React Portal:** Renders the modal outside the main DOM tree (usually at the end of the <body>), which prevents z-index issues.

- **📈 Real-time Visualizations:** Integrated dynamic charts that update automatically as funding requests are moved to the "Approved" status.

# 🚀 Further Roadmap & Scalability

While the current version is a robust frontend prototype, the architecture is designed to support:

- **PostgreSQL Integration:** Transitioning the JSON storage to a relational database for 3rd Normal Form data integrity.

- **Role-Based Access Control (RBAC):** Restricting "Approve" actions to specific Administrative roles.

- **CSV/PDF Export:** Allowing Deans to export budget reports for institutional meetings.

- **Activity Logs:** Tracking exactly who moved an expense from "Pending" to "Approved" for auditing purposes.

# Installation & Setup

```bash
    # Clone the repository
    git clone <your-repo-link>

    # Install dependencies
    npm install

    # Run the development server
    npm run dev
```
