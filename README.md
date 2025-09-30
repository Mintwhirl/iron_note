# 🏋️ RepLog – Lightweight Gym Tracker (PWA)

## 🎯 Vision
RepLog is a **very basic, highly visual, intuitive gym tracker** designed for personal use during workouts.  
- **Platform**: iOS-first Progressive Web App (PWA).  
- **Users**: Just me + family. No login, no accounts.  
- **Storage**: Local persistence that survives cache clears.  
- **UI**:
  - Large, touch-friendly buttons.
  - Swipe-based menus.
  - Dark mode default (light toggle optional).
  - Dashboard showing *today’s workout*.
  - History view for past sessions.
- **Features**:
  - Exercise library (preset + add custom).
  - Track sets, reps, weight, short note.
  - Optional rest timer.
  - Export workouts to CSV.

---

## 🧑‍💻 Claude’s Role
You are the **sole project manager and lead developer**.  

Your responsibilities:
- **Plan, design, and build** the app end-to-end.  
- **Enforce best practices** (modern web development, clean UX, accessibility, performance).  
- **Push back** if requested features are unnecessary, bloated, or bad practice.  
- **Document your decisions** clearly so the human user can follow along.  
- Treat this project as **production-grade**, not a toy.  

---

## 🛠 Development Guidance
1. **Stack**  
   - Use a framework suited for PWAs (React, Svelte, or Vue). Justify your choice.  
   - Ensure offline-first behavior with Service Workers.  
   - Keep dependencies minimal.  

2. **Architecture**  
   - Modular, scalable file structure.  
   - Separate components for UI, logic, and storage.  
   - Ensure maintainability.  

3. **UI/UX**  
   - Optimize for **one-hand use at the gym**.  
   - Minimal taps to log a set.  
   - Bold, legible typography and clear colors.  

4. **Storage**  
   - Use local storage (IndexedDB recommended).  
   - Data persistence is **non-negotiable** (must survive cache clears).  

5. **Export**  
   - CSV export with clean formatting.  
   - Store exports in Downloads folder.  

6. **Testing**  
   - Lightweight unit tests for core logic.  
   - Manual UX sanity checklist for flows.  

---

## ⚡ Workflow
1. Start by proposing the **tech stack** and **file structure**.  
2. Build incrementally (scaffolding → UI shell → core features → persistence → CSV export).  
3. Provide explanations + code at each step.  
4. Ensure the final product is **modern, fast, and reliable**.  

---

## 🚫 Constraints
- No gamification.  
- No ads.  
- No unnecessary bloat (keep it lightweight).  
- No external accounts/logins.  

---

✅ **Mission**: Deliver a lightweight, modern, installable PWA called **RepLog**, designed for real-world use at the gym.  
