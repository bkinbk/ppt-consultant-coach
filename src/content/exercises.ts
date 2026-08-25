import { ExerciseSpec } from "./types";

export const exercises: ExerciseSpec[] = [
  {
    slug: "story-pyramid-order",
    type: "REORDER",
    title: "เรียงลำดับเนื้อหาตาม Pyramid Principle",
    instructions:
      "ลากหรือกดเลือกกล่องด้านล่าง แล้ววางเรียงลำดับให้ถูกต้องตามหลัก Pyramid Principle — จากสิ่งที่ผู้อ่านควรเห็นก่อนสุด ไปจนถึงสิ่งที่อยู่ท้ายสุดของเดค",
    data: {
      layout: "row",
      zones: [
        { id: "z1", label: "ลำดับที่ 1" },
        { id: "z2", label: "ลำดับที่ 2" },
        { id: "z3", label: "ลำดับที่ 3" },
        { id: "z4", label: "ลำดับที่ 4" },
      ],
      chips: [
        { id: "c1", label: "Executive Summary: สรุปข้อค้นพบและข้อเสนอแนะ", correctZoneId: "z1" },
        { id: "c2", label: "เหตุผลสนับสนุนหลัก 3 ข้อ (Action Title แต่ละสไลด์)", correctZoneId: "z2" },
        { id: "c3", label: "รายละเอียด/กราฟสนับสนุนแต่ละเหตุผล", correctZoneId: "z3" },
        { id: "c4", label: "Appendix: ข้อมูลดิบและวิธีคำนวณ", correctZoneId: "z4" },
      ],
    },
    explanation:
      "หลัก Pyramid Principle ให้วางข้อสรุป (Executive Summary) ไว้บนสุดเสมอ ตามด้วยเหตุผลสนับสนุนหลัก แล้วค่อยลงรายละเอียด ส่วนข้อมูลดิบที่ไม่จำเป็นต่อโครงเรื่องหลักให้ย้ายไป Appendix ท้ายเดค",
  },
  {
    slug: "process-flow-reorder",
    type: "REORDER",
    title: "เรียงขั้นตอนกระบวนการอนุมัติให้ถูกลำดับ",
    instructions: "จัดเรียงขั้นตอนต่อไปนี้ให้อยู่ในลำดับที่ถูกต้องของกระบวนการอนุมัติสินเชื่อ",
    data: {
      layout: "row",
      zones: [
        { id: "z1", label: "ขั้น 1" },
        { id: "z2", label: "ขั้น 2" },
        { id: "z3", label: "ขั้น 3" },
        { id: "z4", label: "ขั้น 4" },
      ],
      chips: [
        { id: "c1", label: "ลูกค้ายื่นคำขอสินเชื่อ", correctZoneId: "z1" },
        { id: "c2", label: "เจ้าหน้าที่ตรวจสอบเอกสาร", correctZoneId: "z2" },
        { id: "c3", label: "หัวหน้าอนุมัติวงเงิน", correctZoneId: "z3" },
        { id: "c4", label: "แจ้งผลอนุมัติแก่ลูกค้า", correctZoneId: "z4" },
      ],
    },
    explanation:
      "Process Flow ต้องเรียงตามลำดับเหตุการณ์จริงที่เกิดขึ้น การสลับลำดับ (เช่น อนุมัติก่อนตรวจเอกสาร) จะทำให้ผู้ฟังเข้าใจกระบวนการผิดไปจากความเป็นจริง",
  },
  {
    slug: "trend-insight-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์แนวโน้ม + Insight ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของสไลด์ ตามเลย์เอาต์ 'กราฟแนวโน้ม + กล่อง Insight' (Action Title อยู่บน, กราฟอยู่ซ้าย 60%, Insight อยู่ขวา 40%)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 10 },
        { id: "chart-zone", label: "โซนกราฟ (60%)", x: 4, y: 15, w: 54, h: 38 },
        { id: "insight-zone", label: "โซน Insight (40%)", x: 62, y: 15, w: 34, h: 38 },
      ],
      chips: [
        { id: "c1", label: "Action Title: ยอดขายออนไลน์แซงหน้าร้านตั้งแต่ Q3", correctZoneId: "title-zone" },
        { id: "c2", label: "กราฟเส้น: ยอดขายออนไลน์ vs หน้าร้าน", correctZoneId: "chart-zone" },
        { id: "c3", label: "Insight: ควรเพิ่มงบการตลาดออนไลน์", correctZoneId: "insight-zone" },
      ],
    },
    explanation:
      "เลย์เอาต์มาตรฐานของสไลด์ข้อมูลแบบที่ปรึกษาคือ Action Title อยู่บนสุดเต็มความกว้าง กราฟอยู่ฝั่งซ้าย (พื้นที่ใหญ่กว่าเล็กน้อย ~60%) และกล่อง Insight/So-what อยู่ฝั่งขวา (~40%) เพื่อให้ผู้ฟังเห็นการตีความควบคู่กับข้อมูลเสมอ",
  },
  {
    slug: "matrix-quadrant-position",
    type: "POSITION",
    title: "จัดวางโครงการลงเมทริกซ์ Impact vs Effort ให้ถูกช่อง",
    instructions:
      "ลากชื่อโครงการแต่ละอันไปวางใน quadrant ที่ถูกต้องของเมทริกซ์ Impact (สูง-ต่ำ) กับ Effort (ง่าย-ยาก)",
    data: {
      layout: "canvas",
      zones: [
        { id: "quick-win", label: "Quick Win (Impact สูง, ง่าย)", x: 6, y: 4, w: 42, h: 24 },
        { id: "major", label: "โครงการหลัก (Impact สูง, ยาก)", x: 50, y: 4, w: 42, h: 24 },
        { id: "fill-in", label: "ทำถ้ามีเวลา (Impact ต่ำ, ง่าย)", x: 6, y: 30, w: 42, h: 24 },
        { id: "thankless", label: "ตัดทิ้งไปก่อน (Impact ต่ำ, ยาก)", x: 50, y: 30, w: 42, h: 24 },
      ],
      chips: [
        { id: "c1", label: "ปรับปุ่ม CTA หน้าเว็บ (ทำง่าย กระทบยอดขายมาก)", correctZoneId: "quick-win" },
        { id: "c2", label: "สร้างระบบ CRM ใหม่ทั้งหมด (ใช้เวลานาน แต่กระทบมาก)", correctZoneId: "major" },
        { id: "c3", label: "เปลี่ยนฟอนต์เว็บไซต์ (ทำง่าย กระทบน้อย)", correctZoneId: "fill-in" },
        { id: "c4", label: "รีแบรนด์โลโก้บริษัททั้งหมด (ใช้เวลานาน กระทบยอดขายน้อย)", correctZoneId: "thankless" },
      ],
    },
    explanation:
      "เมทริกซ์ 2x2 ช่วยจัดลำดับความสำคัญโดยดู 2 ปัจจัยพร้อมกัน โครงการที่ Impact สูงและทำง่าย (Quick Win) ควรเริ่มก่อนเสมอ ส่วนโครงการ Impact ต่ำและทำยากควรตัดทิ้งหรือเลื่อนไปทำทีหลังสุด",
  },
  {
    slug: "data-type-template-match",
    type: "MATCH",
    title: "จับคู่สถานการณ์ข้อมูลกับ Template ที่เหมาะสม",
    instructions: "ลากคำอธิบายสถานการณ์แต่ละอันไปวางบน Template ที่เหมาะกับข้อมูลประเภทนั้นที่สุด",
    data: {
      layout: "list",
      zones: [
        { id: "waterfall", label: "Waterfall / Bridge Chart" },
        { id: "timeline", label: "Timeline / Roadmap" },
        { id: "matrix", label: "เมทริกซ์ 2x2" },
        { id: "ranking", label: "Ranking List" },
        { id: "process", label: "Process Flow" },
      ],
      chips: [
        {
          id: "c1",
          label: "อธิบายว่ากำไรปีก่อนกลายเป็นกำไรปีนี้ได้อย่างไร ผ่านปัจจัยรายได้/ต้นทุนหลายตัว",
          correctZoneId: "waterfall",
        },
        { id: "c2", label: "แผนพัฒนาผลิตภัณฑ์ในอีก 4 ไตรมาสข้างหน้า", correctZoneId: "timeline" },
        {
          id: "c3",
          label: "จัดลำดับว่าควรเริ่มโครงการไหนก่อน โดยดูทั้ง Impact และความยากง่าย",
          correctZoneId: "matrix",
        },
        { id: "c4", label: "เรียง 5 สาเหตุหลักที่ลูกค้าเลิกใช้บริการ จากมากไปน้อย", correctZoneId: "ranking" },
        { id: "c5", label: "ขั้นตอนอนุมัติสินเชื่อ 4 ขั้นตอนที่ต้องทำตามลำดับ", correctZoneId: "process" },
      ],
    },
    explanation:
      "การเลือก Template ให้ตรงกับประเภทข้อมูลคือหัวใจของการสื่อสารข้อมูลอย่างมีประสิทธิภาพ — การเปลี่ยนแปลงสะสมใช้ Waterfall, แผนตามเวลาใช้ Timeline, จัดลำดับความสำคัญ 2 มิติใช้เมทริกซ์, จัดอันดับใช้ Ranking List, และขั้นตอนตามลำดับใช้ Process Flow",
  },
  {
    slug: "color-accent-position",
    type: "POSITION",
    title: "เลือกจุดที่ควรใช้สี Accent เน้นเพียงจุดเดียว",
    instructions:
      "สไลด์นี้ต้องการสื่อว่า 'ภาคใต้เติบโตเร็วที่สุด' ลากป้าย 'สี Accent' ไปวางบนตัวเลขที่ควรถูกไฮไลต์เพียงจุดเดียว",
    data: {
      layout: "canvas",
      zones: [
        { id: "north", label: "ภาคเหนือ: +4%", x: 6, y: 20, w: 20, h: 20 },
        { id: "south", label: "ภาคใต้: +22%", x: 28, y: 20, w: 20, h: 20 },
        { id: "east", label: "ภาคตะวันออก: +6%", x: 50, y: 20, w: 20, h: 20 },
        { id: "west", label: "ภาคตะวันตก: +3%", x: 72, y: 20, w: 20, h: 20 },
      ],
      chips: [{ id: "c1", label: "สี Accent (เน้น 1 จุด)", correctZoneId: "south" }],
    },
    explanation:
      "หัวข้อสไลด์บอกว่าใจความสำคัญคือภาคใต้เติบโตเร็วที่สุด ดังนั้นสี Accent ควรอยู่ที่ตัวเลขภาคใต้ (+22%) เพียงจุดเดียวเท่านั้น ส่วนตัวเลขอื่นควรคงเป็นสีเทากลางเพื่อไม่แย่งความสนใจ",
  },
];
