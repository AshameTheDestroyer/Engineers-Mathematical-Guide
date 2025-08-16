## 🔍 Overview

In this lesson, you'll explore the **foundations of linear systems** — sets of linear equations — and understand their **geometric meaning** in two and three dimensions. You'll learn how solutions to these systems correspond to **points of intersection** between lines or planes, and gain insight into when solutions exist, are unique, or don’t exist at all.

By the end of this lesson, you will:

- Define a system of linear equations.
- Solve simple 2×2 systems algebraically and geometrically.
- Interpret solutions geometrically (intersecting, parallel, coincident lines).
- Understand the three possible outcomes for linear systems.
- Extend intuition to 3D (planes in space).

---

## 📐 1. What Is a Linear System?

A **system of linear equations** is a collection of two or more linear equations involving the same set of variables.

### Example (2×2 System):

$$
\begin{align*}
(1)&\quad 2x + y = 5 \\
(2)&\quad x - y = 1
\end{align*}
$$

We seek values of $x$ and $y$ that satisfy **both equations simultaneously**.

> ✅ A **solution** to a linear system is an assignment of values to the variables that makes **all equations true** at once.

---

## 🧮 2. Solving a System Algebraically

Let’s solve the above system using **substitution** or **elimination**.

### Using Elimination:

Add equations (1) and (2):

$$
(2x + y) + (x - y) = 5 + 1 \Rightarrow 3x = 6 \Rightarrow x = 2
$$

Plug $x = 2$ into equation (2):

$$
2 - y = 1 \Rightarrow y = 1
$$

✅ Solution: $(x, y) = (2, 1)$

This is the **only pair** that satisfies both equations.

---

## 🖼️ 3. Geometric Interpretation in 2D

Each linear equation in two variables ($x$, $y$) represents a **line** in the 2D coordinate plane.

So, solving a 2×2 system means:

> 🔎 **Finding the point(s) where the two lines intersect.**

Let’s plot our example:

- Line 1: $2x + y = 5$ → Passes through (0,5) and (2.5,0)
- Line 2: $x - y = 1$ → Passes through (0,-1) and (1,0)

They intersect at $(2, 1)$ — exactly our algebraic solution!

### 🎯 Three Possible Cases in 2D:

| Case | Geometry              | Number of Solutions           | Description                      |
| ---- | --------------------- | ----------------------------- | -------------------------------- |
| 1    | ✅ Intersecting lines | **One unique solution**       | Lines cross at one point         |
| 2    | ❌ Parallel lines     | **No solution**               | Same slope, different intercepts |
| 3    | 🔁 Coincident lines   | **Infinitely many solutions** | Same line, just different forms  |

#### Example: No Solution (Parallel)

$$
\begin{align*}
x + y &= 3 \\
x + y &= 5
\end{align*}
$$

→ Parallel lines → ❌ No intersection

#### Example: Infinite Solutions (Same Line)

$$
\begin{align*}
2x + 3y &= 6 \\
4x + 6y &= 12 \quad \text{(just doubled)}
\end{align*}
$$

→ Both represent the same line → 🔁 Every point on the line is a solution

---

## 🧊 4. Extending to 3D: Planes in Space

Now consider three variables: $x$, $y$, $z$. Each linear equation represents a **plane** in 3D space.

A system of three equations defines **three planes**. The solution is the point (or set of points) where **all three planes intersect**.

### Example (3×3 System):

$$
\begin{align*}
x + y + z &= 6 \\
2x - y + z &= 3 \\
x + z &= 4
\end{align*}
$$

Solving this (via substitution or matrix methods) gives:
$x = 1,\ y = 2,\ z = 3$ → A single point: $(1, 2, 3)$

Geometrically: The three planes meet at a **single point**.

### 🎯 Possible Cases in 3D:

- ✅ **One solution**: Planes intersect at a single point.
- ❌ **No solution**: Planes are parallel or form a "triangular prism" with no common point.
- 🔁 **Infinite solutions**: Planes intersect along a line or are identical.

> 💡 Just like in 2D, consistency and independence determine the nature of the solution.

---

## 🧠 Key Concepts Summary

| Concept                   | Meaning                                                               |
| ------------------------- | --------------------------------------------------------------------- |
| **Linear Equation**       | An equation like $ax + by = c$, graphed as a straight line (or plane) |
| **System of Equations**   | Multiple equations to solve together                                  |
| **Solution Set**          | All variable assignments that satisfy every equation                  |
| **Consistent System**     | Has **at least one** solution                                         |
| **Inconsistent System**   | Has **no solution**                                                   |
| **Independent Equations** | Each adds new information (not redundant)                             |
| **Dependent Equations**   | One can be derived from others → infinite solutions                   |

---

## 🧩 Real-World Connection

Linear systems model real situations:

- Balancing chemical equations
- Finding break-even points in business
- Computer graphics (intersection of surfaces)
- GPS triangulation (solving for position)

Understanding the **geometry** behind them helps you **visualize and verify** solutions.

---

## 📝 Check Your Understanding

**Q1:** What is the geometric meaning of the solution to a 2×2 linear system?

> A: The point where the two lines intersect.

**Q2:** Can two lines in a plane have exactly two intersection points? Why or why not?

> A: No. Two distinct lines can only intersect 0 times (parallel), 1 time (crossing), or infinitely many (same line). Lines are straight — they can’t "curve back".

**Q3:** If three planes in 3D space are parallel, how many solutions does the system have?

> A: Zero — no common point of intersection.

---

## 🚀 What’s Next?

In the next lesson, we’ll formalize solving linear systems using:

- **Row operations**
- **Augmented matrices**
- **Gaussian elimination**

This will give you a powerful algorithmic tool to solve larger systems (4×4, 10×10, or more!) efficiently.

---

## 📚 Additional Resources

- [Khan Academy: Systems of Equations](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations)
- Interactive 3D graphing: [GeoGebra 3D Calculator](https://www.geogebra.org/3d)
