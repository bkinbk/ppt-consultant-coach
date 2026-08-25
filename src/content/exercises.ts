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
  {
    slug: "comparison-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์เปรียบเทียบ (Comparison) ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของเลย์เอาต์ 'เปรียบเทียบสองทางเลือก' (Title อยู่บน, ฝั่งซ้าย = ก่อน, ฝั่งขวา = หลัง, Insight อยู่ล่างสุด)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 8 },
        { id: "before-zone", label: "โซน ก่อน (Before)", x: 4, y: 13, w: 42, h: 30 },
        { id: "after-zone", label: "โซน หลัง (After)", x: 54, y: 13, w: 42, h: 30 },
        { id: "insight-zone", label: "โซน Insight", x: 4, y: 46, w: 92, h: 8 },
      ],
      chips: [
        { id: "c1", label: "Action Title: ทางเลือก B ลดเวลาดำเนินการลง 40%", correctZoneId: "title-zone" },
        { id: "c2", label: "ก่อน: กระบวนการเดิม 6 ขั้นตอน ใช้เวลา 5 วัน", correctZoneId: "before-zone" },
        { id: "c3", label: "หลัง: กระบวนการใหม่ 3 ขั้นตอน ใช้เวลา 3 วัน", correctZoneId: "after-zone" },
        {
          id: "c4",
          label: "Insight: การตัดขั้นตอนซ้ำซ้อนช่วยลดเวลาและต้นทุนลง 40%",
          correctZoneId: "insight-zone",
        },
      ],
    },
    explanation:
      "เลย์เอาต์เปรียบเทียบวาง Action Title เต็มความกว้างด้านบน แบ่งเนื้อหาเป็นสองคอลัมน์เท่ากัน (ก่อน/หลัง) ตรงกลาง และปิดท้ายด้วย Insight สรุปนัยของความแตกต่างเต็มความกว้างด้านล่างเสมอ",
  },
  {
    slug: "process-flow-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์ขั้นตอนกระบวนการ (Process Flow) ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของเลย์เอาต์ 'ขั้นตอนกระบวนการ' (Title อยู่บน, แถวขั้นตอนอยู่กลาง, Insight อยู่ล่างสุด)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 8 },
        { id: "steps-zone", label: "โซนแถวขั้นตอน", x: 4, y: 18, w: 92, h: 22 },
        { id: "insight-zone", label: "โซน Insight", x: 4, y: 44, w: 92, h: 8 },
      ],
      chips: [
        {
          id: "c1",
          label: "Action Title: กระบวนการอนุมัติใหม่ลดขั้นตอนจาก 6 เหลือ 4 ขั้น",
          correctZoneId: "title-zone",
        },
        { id: "c2", label: "กล่องขั้นตอน 1→2→3→4 เรียงแนวนอนพร้อมลูกศรบอกทิศทาง", correctZoneId: "steps-zone" },
        {
          id: "c3",
          label: "Insight: ขั้นตอนที่ 3 คือจุดตัดสินใจหลักที่ควบคุมความเร็วของกระบวนการ",
          correctZoneId: "insight-zone",
        },
      ],
    },
    explanation:
      "เลย์เอาต์ Process Flow วาง Action Title ไว้บนสุด ตามด้วยแถวกล่องขั้นตอนเรียงแนวนอนพร้อมลูกศรทิศทางเดียวกันตรงกลาง และปิดท้ายด้วย Insight ที่ชี้จุดคอขวดหรือจุดตัดสินใจสำคัญด้านล่าง",
  },
  {
    slug: "timeline-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์ไทม์ไลน์ (Timeline) ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของเลย์เอาต์ 'ไทม์ไลน์/โรดแมป' (Title อยู่บน, เส้นเวลาพร้อม milestone อยู่กลาง, Insight อยู่ล่างสุด)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 8 },
        { id: "timeline-zone", label: "โซนเส้นเวลา + Milestone", x: 4, y: 12, w: 92, h: 32 },
        { id: "insight-zone", label: "โซน Insight", x: 4, y: 46, w: 92, h: 8 },
      ],
      chips: [
        {
          id: "c1",
          label: "Action Title: แผนพัฒนาผลิตภัณฑ์แล้วเสร็จภายใน Q4 2569",
          correctZoneId: "title-zone",
        },
        {
          id: "c2",
          label: "เส้นเวลาแนวนอนพร้อม milestone Q1-Q4 สลับกล่องบน-ล่าง",
          correctZoneId: "timeline-zone",
        },
        {
          id: "c3",
          label: "Insight: Q3 คือจุดตัดสินใจว่าจะเดินหน้าเปิดตัวหรือปรับแผน",
          correctZoneId: "insight-zone",
        },
      ],
    },
    explanation:
      "เลย์เอาต์ไทม์ไลน์วาง Action Title ไว้บนสุด เส้นเวลาพร้อม milestone ที่สลับกล่องคำอธิบายบน-ล่างอยู่กลางสไลด์ และ Insight ที่ชี้จุดตัดสินใจสำคัญอยู่ล่างสุด",
  },
  {
    slug: "hierarchy-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์โครงสร้างลำดับชั้น (Hierarchy) ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของเลย์เอาต์ 'โครงสร้างลำดับชั้น' (Title อยู่บน, กล่อง Parent อยู่กึ่งกลางใต้ Title, กล่องลูกเรียงแถวด้านล่าง)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 8 },
        { id: "parent-zone", label: "โซนกล่อง Parent", x: 30, y: 11, w: 40, h: 10 },
        { id: "children-zone", label: "โซนกล่องลูก (แถว)", x: 4, y: 24, w: 92, h: 18 },
      ],
      chips: [
        {
          id: "c1",
          label: "Action Title: ต้นทุนที่สูงขึ้นมาจาก 3 ปัจจัยหลัก โดยค่าขนส่งกระทบมากที่สุด",
          correctZoneId: "title-zone",
        },
        { id: "c2", label: "กล่อง Parent: ต้นทุนรวมเพิ่มขึ้น 12%", correctZoneId: "parent-zone" },
        {
          id: "c3",
          label: "กล่องลูก 3 กล่อง: ค่าขนส่ง / ค่าวัตถุดิบ / ค่าแรงงาน",
          correctZoneId: "children-zone",
        },
      ],
    },
    explanation:
      "เลย์เอาต์โครงสร้างลำดับชั้นวาง Action Title ไว้บนสุด กล่อง Parent (ภาพรวม) อยู่กึ่งกลางด้านบน และกล่องลูกที่แตกย่อยแบบ MECE เรียงเป็นแถวด้านล่าง",
  },
  {
    slug: "waterfall-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์กราฟสะพาน (Waterfall) ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของเลย์เอาต์ 'กราฟสะพาน' (Title อยู่บน, แท่งลอยขั้นบันไดอยู่กลาง, Insight อยู่ล่างสุด)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 8 },
        { id: "bars-zone", label: "โซนแท่งลอยขั้นบันได", x: 4, y: 18, w: 92, h: 26 },
        { id: "insight-zone", label: "โซน Insight", x: 4, y: 46, w: 92, h: 8 },
      ],
      chips: [
        {
          id: "c1",
          label: "Action Title: กำไรเพิ่มขึ้นสุทธิ 15% แม้ต้นทุนวัตถุดิบจะสูงขึ้น",
          correctZoneId: "title-zone",
        },
        {
          id: "c2",
          label: "แท่งลอยขั้นบันได: เริ่มต้น → +รายได้ → -ต้นทุน → -ค่าใช้จ่ายพิเศษ → สิ้นสุด",
          correctZoneId: "bars-zone",
        },
        {
          id: "c3",
          label: "Insight: การเติบโตของรายได้ชดเชยต้นทุนที่สูงขึ้นได้มากกว่า 2 เท่า",
          correctZoneId: "insight-zone",
        },
      ],
    },
    explanation:
      "เลย์เอาต์ Waterfall วาง Action Title ไว้บนสุด แท่งลอยขั้นบันไดที่ไล่จากจุดเริ่มต้นถึงจุดสิ้นสุดอยู่กลางสไลด์ และ Insight สรุปว่าอะไรชดเชยอะไรอยู่ล่างสุด",
  },
  {
    slug: "ranking-position",
    type: "POSITION",
    title: "จัดวางองค์ประกอบสไลด์จัดอันดับ (Ranking) ให้ถูกโซน",
    instructions:
      "ลากชิ้นส่วนแต่ละอันไปวางในโซนที่ถูกต้องของเลย์เอาต์ 'จัดอันดับความสำคัญ' (Title อยู่บน, แท่งอันดับ 1 อยู่บนสุดของลิสต์, แท่งอันดับที่เหลือไล่ลงมา)",
    data: {
      layout: "canvas",
      zones: [
        { id: "title-zone", label: "โซน Action Title", x: 4, y: 2, w: 92, h: 8 },
        { id: "top-rank-zone", label: "โซนแท่งอันดับ 1", x: 4, y: 12, w: 92, h: 10 },
        { id: "rest-rank-zone", label: "โซนแท่งอันดับ 2-5", x: 4, y: 22, w: 92, h: 30 },
      ],
      chips: [
        {
          id: "c1",
          label: "Action Title: 3 สาเหตุแรกคิดเป็น 70% ของสาเหตุการเลิกใช้บริการทั้งหมด",
          correctZoneId: "title-zone",
        },
        {
          id: "c2",
          label: "แท่งอันดับ 1 (ยาวที่สุด ใช้สี Accent เน้น): บริการหลังการขายช้า — 32%",
          correctZoneId: "top-rank-zone",
        },
        {
          id: "c3",
          label: "แท่งอันดับ 2-5 (สั้นลงเรื่อยๆ ใช้สีเทากลาง)",
          correctZoneId: "rest-rank-zone",
        },
      ],
    },
    explanation:
      "เลย์เอาต์ Ranking List วาง Action Title ไว้บนสุด แท่งอันดับ 1 ที่ยาวที่สุดและใช้สี Accent เน้นอยู่บนสุดของลิสต์ ส่วนแท่งอันดับรองลงมาเรียงสั้นลงเรื่อยๆ ด้วยสีเทากลางด้านล่าง",
  },
];
