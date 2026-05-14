# 🎯 Task Dashboard — DEVDEVA Frontend Test

> Frontend Developer Test — ข้อ 1: Task Dashboard
> by ภูริมาศ สุดานิช

[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-State-orange)](https://zustand.docs.pmnd.rs/)

---

## 📋 สารบัญ

- [Demo](#-demo)
- [วิธีรัน](#-วิธีรัน)
- [Tech Stack](#-tech-stack)
- [Features ตามโจทย์](#-features-ตามโจทย์)
- [Bonus Features](#-bonus-features)
- [Architecture Decisions](#-architecture-decisions)
- [Folder Structure](#-folder-structure)
- [เทคนิคการเขียนที่ใช้](#-เทคนิคการเขียนที่ใช้)

---

## 🌐 Demo

🔗 **Live Demo:** [https://task-dashboard-tau-tawny.vercel.app/](#)

🎬 **Screenshots:**

| Light Mode     | Dark Mode             |
| -------------- | --------------------- |
| Dashboard view | Dashboard view (dark) |

---

## 🚀 วิธีรัน

### ความต้องการ

- Node.js v18+
- npm v10+

### ขั้นตอน

\`\`\`bash

# 1. Clone repository

git clone https://github.com/YOUR_USERNAME/task-dashboard.git
cd task-dashboard

# 2. ติดตั้ง dependencies

npm install

# 3. รัน dev server

npm run dev

# เปิด browser ที่ http://localhost:5173

\`\`\`

### Build for production

\`\`\`bash
npm run build
npm run preview
\`\`\`

---

## 🛠️ Tech Stack

| Package                   | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| **React 18 + TypeScript** | Core framework + type safety             |
| **Vite**                  | Build tool ที่เร็วและทันสมัย             |
| **Tailwind CSS v4**       | Utility-first styling (CSS-first config) |
| **Zustand**               | Lightweight state management             |
| **lucide-react**          | Modern icon library                      |
| **date-fns**              | Date formatting                          |
| **clsx**                  | Conditional className helper             |

### ทำไมเลือก stack นี้?

- **Vite** — Dev server เริ่มเร็วใน 1 วินาที (vs CRA 30+ วินาที)
- **Zustand** — เบา (~1KB), ไม่ต้องห่อ Provider, มี selective subscription
- **Tailwind v4** — CSS-first config เร็วขึ้น 5x จาก v3
- **TypeScript** — จับ bug ตั้งแต่ตอนเขียน code

---

## ✅ Features ตามโจทย์

ครบทั้ง 6 requirement ที่ระบุในโจทย์:

| Item  | Feature                                                                            | Status |
| ----- | ---------------------------------------------------------------------------------- | ------ |
| **A** | Global Search ที่ Header — ค้นได้ทุก field (title, priority, status, tag, project) | ✅     |
| **B** | Filter ในช่องเดียว — Search + Priority + Status                                    | ✅     |
| **C** | คลิกการ์ด → Popup แสดง detail + ปุ่ม Edit                                          | ✅     |
| **D** | ปุ่ม "+ New Task" → Popup ฟอร์มกรอกข้อมูล                                          | ✅     |
| **E** | Pagination — 2 cards/column × 3 columns (6 cards/page)                             | ✅     |
| **F** | Sidebar collapse/expand                                                            | ✅     |

---

## 🎁 Bonus Features

ฟีเจอร์เสริมที่เพิ่มเข้ามาเพื่อยกระดับ UX และแสดงเทคนิคเพิ่มเติม:

### 1. 💾 Data Persistence

- ใช้ **Zustand persist middleware** เก็บ tasks ใน localStorage
- ใช้ `partialize` เลือกเก็บเฉพาะ state ที่ต้องการ (tasks + theme, ไม่เก็บ search)
- เปลี่ยน/สร้าง/ลบ task แล้ว refresh → ข้อมูลไม่หาย

### 2. 🎬 Smooth Animations

- Custom keyframes ใน Tailwind v4 (`fade-in`, `scale-in`, `slide-in`)
- ใช้ `cubic-bezier(0.16, 1, 0.3, 1)` สำหรับ premium feel
- Modal entry, card hover lift, pagination scale

### 3. 📊 Sort Tasks

- เรียงตาม Date (Newest/Oldest), Priority (High → Low), Progress
- ใช้ `Record<Priority, number>` map priority เป็นตัวเลข — type-safe sort
- Reset page อัตโนมัติเมื่อเปลี่ยน sort

### 4. 🗑️ Delete Task with Confirm

- Reusable `ConfirmDialog` component
- ใช้ Modal เดียวกับ Detail (composition pattern)
- UX safe: วาง Delete แยกจาก Edit/Close เพื่อป้องกันคลิกผิด

### 5. 🌙 Dark Mode Toggle

- Auto-detect **system preference** ตอนเริ่มต้น (`prefers-color-scheme`)
- Persist theme เลือกใน localStorage
- ใช้ Tailwind v4 `@custom-variant dark` (class-based)
- รองรับทุก component รวม form, modal, date picker

### หมายเหตุ

- ใช้ `date-fns` `parseISO` แทน `new Date(string)` เพื่อหลีกเลี่ยง timezone bug
- TypeScript strict mode (`verbatimModuleSyntax`) — แยก `import type` จาก value imports

---

## 🏗️ Architecture Decisions

### 1. แยก Search 2 ที่ (A vs B) — ทำไม?

ในภาพโจทย์มี search 2 จุด ผมตีความให้ทำงานต่างกัน:

|          | Search A (Header)                                 | Search B (FilterBar)                     |
| -------- | ------------------------------------------------- | ---------------------------------------- |
| Logic    | **OR** — match field ใดก็ได้                      | **AND** — combine กับ dropdown filter    |
| Scope    | ทุก field (title, priority, status, tag, project) | เฉพาะ title                              |
| Use case | Quick search รู้แล้วว่าจะค้นอะไร                  | Structured filter — narrow down ทีละขั้น |

**Reference:** คล้ายกับ tool อย่าง Linear, Notion ที่มีทั้ง command palette และ filter view

### 2. Modal เดียว 3 modes (View / Edit / Create)

แทนที่จะสร้าง 3 component แยก ผมใช้ Modal เดียวกัน + component ภายในต่างกัน:

\`\`\`
[คลิกการ์ด] → selectedTask + mode='view' → <TaskDetailView />
[กด Edit] → mode='edit' → <TaskForm initialData={task} />
[+New Task] → isCreateModalOpen=true → <TaskForm /> (no initialData)
\`\`\`

**ทำไมแยก isCreateModalOpen ออกจาก selectedTask?**

- Logic ชัดเจน — view/edit ใช้ task ที่มี, create ไม่มี
- State ไม่ conflict — กดการ์ดและกด +New ไม่ชนกัน
- Code อ่านง่าย

### 3. Polymorphic TaskForm Component

TaskForm ใช้ได้ทั้ง Edit + Create ด้วย **optional prop**:

\`\`\`tsx
// Edit mode - ส่ง initialData
<TaskForm initialData={task} onSubmit={handleSave} />

// Create mode - ไม่ส่ง initialData
<TaskForm onSubmit={handleCreate} />
\`\`\`

Form ปรับตัวเอง: ใช้ค่าเดิม + ปุ่ม "Save Changes" หรือ form เปล่า + ปุ่ม "Create Task"

### 4. Filter Pipeline ที่ optimize ด้วย useMemo

\`\`\`
tasks (raw)
↓ Global Search (OR — ทุก field)
↓ Local Search (AND — title)
↓ Priority Filter
↓ Status Filter
filteredTasks
↓ Sort (date/priority/progress)
sortedTasks
↓ Group by status (3 columns)
tasksByStatus
↓ Slice 2/column independently
paginatedTasksByStatus
↓ Render 3 columns
\`\`\`

ทุก step ใช้ `useMemo` cache — ไม่คำนวณซ้ำทุก render

### 5. Pagination แบบ Per-Column Slicing 🆕

ตอนแรกผมทำ pagination แบบ **global slice** (ตัด 6 ตัวแรกจาก sorted list) แต่พบว่าเมื่อใช้ร่วมกับ Kanban 3-column layout จะเกิดปัญหา:

\`\`\`
ตัวอย่าง: Sort "Date Newest first"
หน้า 1 — slice 6 ตัวแรก
→ To Do: 4 cards (task ใหม่บังเอิญอยู่ใน To Do)
→ In Progress: 2 cards
→ Done: 0 cards ← ว่าง! ทั้งที่ Done มี task อยู่
\`\`\`

**Bug นี้เป็น "Logic ไม่ match กับ UI Layout"** — sort ทำงานถูก, pagination ทำงานถูก, แต่รวมกับ Kanban layout แล้วผลลัพธ์ดูแปลก

### Solution: เปลี่ยนเป็น Per-Column Slicing

\`\`\`typescript
// แต่ละ column slice 2 ตัวอิสระจากกัน
const paginatedTasksByStatus = {
'To Do': tasksByStatus['To Do'].slice(start, end),
'In Progress': tasksByStatus['In Progress'].slice(start, end),
'Done': tasksByStatus['Done'].slice(start, end),
};

// Total pages ยึดจาก column ที่ยาวที่สุด
const totalPages = Math.ceil(maxColumnLength / CARDS_PER_COLUMN);
\`\`\`

ผลคือ:

- ✅ ทุก column มี task ให้เห็นเสมอ (ตรงกับ mental model ของ Kanban)
- ✅ Sort ยังทำงาน (เรียงภายในแต่ละ column)
- ✅ ตรงกับ pattern ของ Trello, Linear, Jira

---

## 🔍 Peer Review Process

โปรเจกต์นี้ผ่าน **Code Review จากclaude-code** 2 รอบ ทำให้พบและแก้ไข bugs ที่ผมพลาด:

### 🐛 Round 1: Critical + Responsive Issues (4 bugs)

| #   | Bug                          | Severity    | Fix                                                                                                                                                           |
| --- | ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Date Timezone Bug**        | 🔴 Critical | `new Date("2024-03-15")` parse เป็น UTC midnight ทำให้ user ใน timezone อื่นเห็นวันเลื่อน — แก้ด้วย `parseISO` จาก date-fns + custom helper สำหรับ local date |
| 2   | **Sidebar ไม่ซ่อนบน mobile** | 🟠 High     | เพิ่ม mobile drawer + hamburger menu + overlay                                                                                                                |
| 3   | **Header search overflow**   | 🟡 Medium   | ปรับ width responsive: `w-28 sm:w-48 md:w-56 lg:w-64`                                                                                                         |
| 4   | **FilterBar overflow on md** | 🟡 Medium   | เปลี่ยน breakpoint เป็น `lg:flex-row lg:flex-wrap xl:flex-nowrap`                                                                                             |

### 🐛 Round 2: Edge Cases + Visual Polish (3 bugs)

| #   | Bug                             | Severity  | Fix                                                                                                     |
| --- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| 5   | **Pagination ไม่มี truncation** | 🟠 High   | render ปุ่มทุกหน้าตรงๆ — ถ้ามี 15 หน้าจะล้น UI แก้ด้วย smart pagination pattern: `[1 ... 7 8 9 ... 15]` |
| 6   | **Badge ไม่มี dark mode**       | 🟡 Medium | เพิ่ม `dark:` prefix ทุก variant ของ Badge (priority, status, tag)                                      |
| 7   | **Icon ใช้ `dark:text-white`**  | 🟢 Low    | search icon ใช้ `dark:text-white` สว่างเกิน — เปลี่ยนเป็น `dark:text-gray-500` ตาม visual hierarchy     |

### 💡 Bonus Refactor: useEffect Dependencies

ใน Round 2 พบว่า `useEffect` reset pagination ใช้ `tasks` ใน dependency — จะ reset ทุกครั้งที่ task เปลี่ยน (รวมตอน edit) ผม refactor ให้แยก `useEffect` watch `totalPages` แทน:

\`\`\`typescript
// ❌ Before - reset page ทุกครั้งที่ tasks เปลี่ยน (รวม edit)
useEffect(() => {
setCurrentPage(1);
}, [globalSearch, searchQuery, priorityFilter, statusFilter, sortBy, tasks]);

// ✅ After - reset page เฉพาะตอน filter เปลี่ยน หรือ totalPages เปลี่ยน
useEffect(() => {
setCurrentPage(1);
}, [globalSearch, searchQuery, priorityFilter, statusFilter, sortBy]);

useEffect(() => {
if (currentPage > totalPages) {
setCurrentPage(Math.max(1, totalPages));
}
}, [totalPages, currentPage]);
\`\`\`

### 📊 สรุป Review Process

- **2 รอบ Review** — 7 bugs found + fixed ครบ 100%
- **เรียนรู้:** Timezone handling, Responsive design edge cases, Visual hierarchy in dark mode, useEffect dependency optimization
- **Process:** เปิดรับ feedback → analyze root cause → fix + ทดสอบ → document

## 📂 Folder Structure

\`\`\`
src/
├── components/
│ ├── layout/
│ │ ├── Sidebar.tsx # Item F + Dark mode toggle
│ │ └── Header.tsx # Item A (global search)
│ ├── ui/
│ │ ├── Badge.tsx # Priority/Tag/Status chips
│ │ ├── Modal.tsx # Reusable modal base
│ │ ├── Pagination.tsx # Item E
│ │ └── ConfirmDialog.tsx # Delete confirmation
│ └── task/
│ ├── TaskCard.tsx # Card ใน 3 columns
│ ├── FilterBar.tsx # Item B (filter + sort)
│ ├── TaskDetailView.tsx # Item C (view mode)
│ └── TaskForm.tsx # Item C + D (edit/create)
├── pages/
│ └── DashboardPage.tsx # หน้าหลัก
├── store/
│ └── useTaskStore.ts # Zustand store
├── types/
│ └── task.ts # TypeScript types
├── data/
│ └── mockTasks.ts # Mock data 12 tasks
├── App.tsx # Layout + theme effect
└── index.css # Tailwind + dark mode config
\`\`\`

---

## 💡 เทคนิคการเขียนที่ใช้

### React Patterns

- **Controlled Components** — FilterBar, TaskForm รับ state จาก parent
- **Polymorphic Components** — TaskForm ใช้ได้ 2 modes ด้วย optional prop
- **Composition** — Modal รับ children, ConfirmDialog ใช้ Modal เป็น base
- **Compound Pattern** — DashboardPage จัดการ state ของลูกๆ ทั้งหมด

### Hooks ที่ใช้

- `useState` — Local state ที่ component เป็นเจ้าของ
- `useMemo` — Cache filtered/sorted/paginated tasks
- `useEffect` — Reset page เมื่อ filter เปลี่ยน, lock scroll, apply theme
- `useRef` — Reference DOM (Modal element)

### TypeScript Patterns

- **Union Types** — `Priority | 'All'` แทน enum
- **Utility Types** — `Omit<Task, 'id'>` สำหรับ form, `Partial<Task>` สำหรับ update
- **Record Types** — `Record<Priority, number>` สำหรับ type-safe sorting
- **Type-only Imports** — `import type` แยกจาก value imports เพื่อ optimize bundle
- **Discriminated Unions** — Modal mode (`'view' | 'edit'`)

### Performance Optimization

- `useMemo` สำหรับ filter/sort/pagination logic
- **Selective subscription** ใน Zustand — re-render เฉพาะเมื่อ state ที่ใช้เปลี่ยน
- Pagination 6 cards/page — ลด DOM nodes
- React.lazy ready (พร้อมรองรับถ้าโปรเจกต์ใหญ่ขึ้น)

### Accessibility

- `<button>` ทั้งใบสำหรับการ์ด — keyboard nav, screen reader
- `aria-label` ที่ปุ่มไอคอน
- `role="dialog"` + `aria-modal` ที่ Modal
- ปิด Modal ด้วย Escape key

---

## 🧪 Testing Strategy (ที่ทดสอบ manually)

### Filter

- [x] Search empty → แสดง task ทั้งหมด
- [x] Search ที่ match → กรองถูก
- [x] Search ที่ไม่ match → No tasks
- [x] รวม search + priority + status → AND condition
- [x] Clear ปุ่ม → reset ทั้งหมด

### Modal

- [x] เปิดด้วยการคลิกการ์ด → View mode
- [x] กด Edit → เปลี่ยนเป็น Edit mode (modal เดิม)
- [x] กด +New → Create mode
- [x] ปิดด้วย: ปุ่ม X | Cancel | Backdrop | ESC

### Persistence

- [x] สร้าง task → refresh → ข้อมูลยังอยู่
- [x] Theme เลือก → refresh → ยังเป็น mode เดิม
- [x] Clear localStorage → reload → ใช้ system preference

### Pagination (Edge cases ที่เจอจริง)

- [x] เห็นทุก column ที่มี task แม้หลัง sort
- [x] Sort + Pagination ทำงานร่วมกันถูก
- [x] Filter เหลือ 0 → Pagination ซ่อน
- [x] Reset page เมื่อเปลี่ยน sort/filter

### Responsive (จากการ Review)

- [x] Mobile (375px) — sidebar drawer + overlay ทำงาน
- [x] Tablet portrait (768px) — FilterBar stack vertical
- [x] Tablet landscape (1024px) — FilterBar row + wrap
- [x] Desktop (1280px+) — all in one row
- [x] Resize ต่อเนื่อง — ไม่มี jarring transitions

### Pagination Edge Cases (จากการ Review)

- [x] หน้าน้อย ≤ 7 — แสดงทุกหน้า
- [x] หน้าเยอะ (15) — truncate ด้วย `...`
- [x] หน้าปัจจุบันใกล้ first — `[1 2 3 ... 15]`
- [x] หน้าปัจจุบันกลาง — `[1 ... 7 8 9 ... 15]`
- [x] หน้าปัจจุบันใกล้ last — `[1 ... 13 14 15]`

### Internationalization (จากการ Review)

- [x] Date display ถูกในทุก timezone (parseISO)
- [x] Default date = local today ไม่ใช่ UTC

---

## 📝 Notes

- **โจทย์ข้อ 2** (Chart + Export PDF) อยู่ใน repository แยกต่างหากเพื่อให้ scope ของแต่ละข้อชัดเจน
- ทุก feature ทดสอบบน **Chrome, Firefox, Edge** บน Windows
- Responsive design: ใช้ได้ทั้ง desktop และ tablet (mobile รองรับ แต่ optimize สำหรับ desktop เป็นหลัก)

---

## 👤 ผู้พัฒนา

**ภูริมาศ สุดานิช**

- 📧 Email: [phurimart14@gmail.com]
- 📱 Phone: [096-0978924]
- 🐙 GitHub: [https://github.com/phurimart14/task-dashboard]

---

_Generated for DEVDEVA Frontend Developer Test — May 2026_
