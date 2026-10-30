# Hi, I'm Tahmid Rafi
### Lead Full Stack Software Engineer & Solutions Architect
Bangkok, Thailand • [tahmid.space](https://tahmid.space) • [LinkedIn](https://www.linkedin.com/in/tahmid-bin-taslim/) • [Email](mailto:tahmidbintaslimrafi@gmail.com)

Open to senior and lead engineering roles in Bangkok.

---

### About me
Lead Full Stack Software Engineer & Solutions Architect with 5+ years of verified production experience architecting, scaling, and maintaining high-concurrency web applications, reactive Single-Page Applications (SPAs), and decoupled asynchronous backends.

I bridge product vision with robust engineering, translating complex business requirements into maintainable, low-latency architectures with automated CI/CD quality gates and zero-downtime deployments.

* **Current Focus:** Scalable SaaS architectures, event-driven pipelines, and high-throughput B2B/B2C platforms.
* **Core Philosophy:** Pragmatic architecture over hype. Applying **KISS**, **YAGNI**, and **SOLID** principles, prioritizing clean domain boundaries and battle-tested message brokers (Redis, RabbitMQ) over unnecessary microservice complexity.
* **Based In:** Bangkok, Thailand.

---

### Experience

* **Senior Software Developer, [Marion's Kitchen Group](https://marionskitchen.com)** (Mar 2024 to present, Bangkok): lead a squad of four full-stack developers across the group's e-commerce platforms and internal SaaS.
* **Senior Software Developer, [Trienpont International](https://trienpont.com)** (May 2023 to Feb 2024, Bangkok): led full-stack engineering for the Amazing Properties real estate portal.
* **Full Stack Developer, [Relevant Audience](https://relevantaudience.com)** (Nov 2021 to May 2023, Bangkok): co-architected TCAS, Thailand's national university admission eligibility platform.
* **BS in Information Technology (Data Science)**, Stamford International University, 2018 to 2022.

---

### Core technical stack

* **Frontend & SPAs:** Vue 3, Pinia, Vuex, React, TypeScript, JavaScript (ES6+), Backend-For-Frontend (BFF) Pattern, Tailwind CSS, Vite.
* **Backend Systems & APIs:** Python 3.x (FastAPI, Django), Node.js (Express), RESTful API Architecture, Asynchronous Task Queues (Redis, RabbitMQ, Celery), Dead-Letter Queues (DLQ), Webhook Gateways.
* **Databases & Data Engineering:** PostgreSQL (EXPLAIN ANALYZE, Composite B-Tree Index Tuning), MySQL, Redis (Caching, Distributed Locking), Algolia AI Search, Automated PDF/CSV Parsing & ETL Ingestion.
* **Cloud Infrastructure & DevOps:** Amazon Web Services (AWS EC2, S3), Docker Containerization, Kubernetes, GitHub Actions CI/CD, Linux/Unix Shell Scripting.

---

### Production platforms

* **[Marion's Kitchen](https://marionskitchen.com) & [Cook Dine Host](https://cookdinehost.com):** High-traffic B2B e-commerce and B2C lifestyle platforms. PostgreSQL schema and index work took P95 API latency from 650ms to under 180ms, and Redis with Celery/RabbitMQ queues cut background-job runtimes by 45% at 99.95% uptime.
* **[Amazing Properties](https://amazingproperties.org):** Production real estate portal on React and a Node.js Backend-for-Frontend over headless WordPress (40% faster initial render), with Algolia search under 50ms, Google Maps, and an in-house Haversine algorithm for distances to BTS/MRT stations.
* **TCAS National Admissions Portal:** Thailand's national university admission eligibility platform, co-architected by a two-person team. An automated pipeline turns hundreds of PDF and CSV handbooks into structured data, and Node.js scoring APIs on AWS (Docker, Kubernetes) held 99.9% uptime through peak application cycles.

---

### Open source

| Project | Live | Status | What it is |
| --- | --- | --- | --- |
| **[checkout-sentinel](https://github.com/tahmidbintaslim/checkout-sentinel)** | [Demo dashboard](https://checkout-sentinel-demo.vercel.app) (sample data) | v0.2, early | Scheduled synthetic checks for Shopify and WooCommerce stores. A Playwright browser opens a product page, adds it to the cart, confirms the cart changed and loads checkout on a desktop and a mobile viewport, then sends one alert when a step fails or gets slow and one when it recovers. It never enters payment details or places an order. CLI, NestJS API and BullMQ worker on Postgres and Redis, with a Docker Compose stack. |
| **[Sun UI](https://github.com/tahmidbintaslim/sun-ui)** | [Storybook](https://sun-ui-brown.vercel.app) | In development, not on npm yet | React components built on Material UI v7, with one `variant`, `color` and `size` API across 26 components, plus design tokens and light and dark themes. |
| **[Unicorn UI](https://github.com/tahmidbintaslim/Unicorn-UI)** | [Demo](https://shadcn-ui-library.vercel.app) | Working demo | Card components for marketing and SaaS pages (pricing, statistics, testimonial, feature, blog and interactive), built with React, TypeScript and Tailwind CSS on shadcn/ui, with live previews and copy-paste code. |
| **[Shikhbo AI](https://github.com/tahmidbintaslim/Shikhbo-AI)** | Not live yet | Prototype | Bengali and English homework helper for students in Bangladesh, built with Next.js and TypeScript. It finds matching pages in NCTB Class 1 textbooks through Upstash Vector and answers an exact repeat question from a Redis cache. |
| **[Universal Agent Gateway](https://github.com/tahmidbintaslim/shopify-ucp)** | No demo | Prototype | Shopify embedded app meant to let AI agents query a store's catalog, through an MCP-style JSON-RPC endpoint over the Shopify Admin GraphQL API. No store can install it yet. |

---

### Latest writing
<!-- BLOG-POST-LIST:START -->
- [How I Use Redis Beyond Simple Caching: A Senior Dev&#39;s Perspective](https://dev.to/tahmidbintaslim/how-i-use-redis-beyond-simple-caching-a-senior-devs-perspective-2llf)
- [AI Driven Development 2026: The Age of Agents](https://medium.com/@tahmidbintaslimrafi/ai-driven-development-2026-the-age-of-agents-7908169c67ea)
- [OpenAI just dropped the Codex app for Mac](https://blog.cubed.run/openai-just-dropped-the-codex-app-for-mac-5de0bb54788b)
- [OpenClaw In Action](https://blog.cubed.run/openclaw-in-action-ead22260f2d3)
- [AI Era for Shopify merchants](https://dev.to/tahmidbintaslim/ai-era-for-shopify-merchants-bk5)
<!-- BLOG-POST-LIST:END -->

More at [tahmid.space/blog](https://tahmid.space/blog), [Medium](https://medium.com/@tahmidbintaslimrafi) and [Dev.to](https://dev.to/tahmidbintaslim).

---

<sub>Work authorization: Non-Immigrant IB visa (BOI approved) and Thai work permit. Based in Bangkok, no relocation needed.</sub>
