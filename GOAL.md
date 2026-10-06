# xdesign · 目标与验收（供 goal 循环读取）

## 0. 北极星目标
> 造出 **xdesign**：以 interface-design 为基座，融合 hallmark 的「强制 token + 确定性门禁」与 huashu-design 的「像素风 / 先出多方向」。
> 目标：在 AI 生成网页的 **体系性 + 可访问性 + 健壮性** 上，**系统性、可复现地超越当前所有被测 skill**，并能跨会话产出一致的设计系统。

一句话验收：**在固定 Benchmark 上，xdesign 的 v2 综合分 ≥ 9.0/10，且六个维度均不低于当前最强单项。**

## 1. 量化成功标准（适应度函数）
沿用已验证的 v2 评分（详见 `scripts/measure.mjs`）：

| 维度 | 权重 | 目标 | 硬门槛 |
|---|---|---|---|
| Token 纪律 | 28% | ≥ 0.90 | 裸色值/裸长度（非 token）≈ 0 |
| 间距体系 | 14% | ≥ 0.95 | 离 4px 网格的间距 ≈ 0 |
| 字体体系 | 12% | ≥ 0.95 | 字体族 ≤ 3、字号 ≤ 8 档、无禁用字体 |
| CSS 质量 | 12% | ≥ 0.95 | `!important` = 0 |
| axe 可访问性 | 18% | 加权违规 ≤ 2 | 0 个 critical / serious |
| 健壮性 | 16% | = 1.0 | 320/375/768/1280 全无横向溢出 |

附加目标：
- 同一 `system.md` 下多页漂移率 < 5%。
- 稳定产出 `system.md` + `tokens.css` + `design.md`（DTCG 风格）+ 组件速查。
- 支持 ≥ 4 类风格（编辑/极简/开发者/像素风），切换后综合分不回退。

## 2. 自迭代闭环（棘轮式，只保留使总分提升的改动）
1. **测**：Benchmark 生成 → `dscheck.mjs` + axe/overflow（Playwright）→ `measure.mjs` 出分。
2. **诊**：定位最低分维度 + 最高频失败规则。
3. **改**：只改 skill（references / gates / templates / scripts），**禁止改 Benchmark 或评分标准**。
4. **验**：每 brief × 3 次取均值，对比上一轮。
5. **留**：总分↑ 且无硬门槛由绿转红 → 保留；否则回滚。

防过拟合：训练集与 **hold-out 集分离**；每 3 轮用 hold-out 验证；结论取 3 次均值。

## 3. Benchmark 规格
- 训练集：API 网关首页、仪表盘、设置页、定价页、文档站、电商详情、博客、像素风专题（8 brief × 3 轮 × 3 次）。
- 留出集（仅验收）：医疗预约、政务门户、音乐 App、招聘页（4 brief）。
- 统一约束：单文件 HTML、仅 Google Fonts、响应式、中文为主。
- 对照基线：同 brief 跑 `baseline / frontend-design / hallmark / interface-design`。

## 4. 里程碑
- **M0 脚手架**：SKILL.md + token-architecture + 模板 + 像素风模块。
- **M1 检查器**：`dscheck.mjs` / `measure.mjs` 跑通（browser 检查经 Playwright MCP 落 JSON）。
- **M2 基准**：Benchmark 生成→测量→scorecard 全自动。
- **M3 追平**：六维度均 ≥ 当前最强单项。
- **M4 达标**：综合 ≥ 9.0，硬门槛全绿。
- **M5 系统产物**：system.md / design.md / tokens.css + 漂移率 < 5%。
- **M6 多风格**：像素风 + 目录主题不回退。
- **M7 泛化**：hold-out 达标、3 次重复稳定。

## 5. 每次迭代 DoD
- 综合分提升或持平，且无硬门槛由绿转红；
- 改动可追溯到某个失败规则（禁止「感觉更好」式改动）；
- 3 次重复分项方差 ≤ 0.3；
- 检查器 0 报错、axe 无 critical/serious、无横向溢出。

## 6. 风险与护栏
- 过拟合 → hold-out + 规则要写「为什么」，不写死特例。
- 多样性与一致性冲突 → 多样性只在「项目起步选向」；选定后一律对齐 system.md。
- axe 仅覆盖 ~57% → 视作下限，不代表「无障碍已完成」。
- 禁止通过改 Benchmark/评分标准来刷分。

## 7. 风格基准（向 exemplars 学习；非数值，需目检）
除"成体系"外，**UI 风格也要有明确的学习对象**（见 `references/style-exemplars.md`）：
- **默认（非像素）**：学 **interface-design R1「暖墨黄铜/Ink & Brass」** —— 暖色暗底(非冷灰)、单一黄铜强调色、**border 主导而少阴影/渐变**、羊皮纸内嵌数据面、serif+sans+mono 三角色、tabular 数字、产品专属 signature motif。
- **像素风**：以 **huashu-design R2** 为准（优于 interface-design R2 与其它）—— **金 `#FFC94A` 主导的多色像素调**、**中文标题用 `ZCOOL QingKe HuangYou`**、硬 1:1 阴影 + crispEdges；interface-design R2 作"更克制"的次级参考。
- **DoD（风格）**：每个产出必须命中第 7 节 checklist 的至少 5/6 条，且与 E1(或 E3) 的"气质"一致；由人工目检确认（无法自动评分，故不纳入 measure.mjs，但属验收项）。

## 8. 当前状态（见 ~/xdesign-bench/REPORT.md）
- M0–M4、M6、M7 ✅：训练集 8×3=24 页平均 **9.98**（min 9.82），hold-out 4 页 **10.00**；axe 0/0/0/0、0 溢出、0 裸值、重复方差 0。
- M5 ◑：模板齐备；跨会话漂移未在 harness 内验证（需共享 system.md 的多轮会话）。
- 唯一非满分项：3 页 `type=0.85`（用了 9 档字号，>8）。
