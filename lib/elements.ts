export type Element = {
  slug: string;
  code: string;
  title: string;
  short: string;
  summary: string;
  docId: string;
};

export const elements: Element[] = [
  {
    slug: "problem-statement",
    code: "01",
    title: "Problem Statement",
    short: "Problem",
    summary:
      "Visually impaired people face a high risk of serious injury from falls during daily mobility in various indoor and outdoor environments. This is primarily because current aids like canes don't reliably detect or warn users about steep drop-offs or overhanging obstacles. With 46.7% of visually impaired individuals reporting a fall each year, leading to injury and loss of independence, a more reliable solution is urgently needed to ensure their safety and mobility.",
    docId: "1nDz6bz54DrtDPqI0bfQsvnfclK2gqZocdgTtrQ6KO3k",
  },
  {
    slug: "patents-products",
    code: "02",
    title: "Relevant Patents and Products",
    short: "Patents & Products",
    summary:
      "This report evaluates both existing patents and commercially available products, ranging from complex intelligent glasses and feature-rich smart canes to innovative wearable sensory substitution prototypes, to analyze the current landscape of solutions related to the problem statement. The evaluation of these solutions focuses specifically on the effectiveness of their sensor technology (ultrasonic, infrared, and camera) in accurately detecting high-risk hazards like steep drop-offs and overhanging obstacles. By identifying technological gaps, looking at the trade-off between reliability, high cost, and user-friendliness of the solutions, the analysis can determine the optimal foundation for a new solution necessary to ensure enhanced safety and independent mobility for the visually impaired.",
    docId: "1sjpxyvHGcmJJS3mgM5w-wlJrqK4FuU7b927Fz7OUS1E",
  },
  {
    slug: "solution-requirements",
    code: "03",
    title: "Solution Requirements",
    short: "Requirements",
    summary:
      "Feedback from experts in the field of visual aid devices, devices using different types of sensors, and stakeholders such as visually impaired people, caretakers, and legislators of ADA was crucial to determine the design specifications. A significant amount of research of already existing devices, designs, and patents was required to create the specifications and order them from most important to least. All of this, along with examining the pros and cons of each product, was used to determine the specifications for the prototype.",
    docId: "1nWf_rdKtXotnQ67N7QTzyLDJmaA_Y50RtsyrtWPMVZw",
  },
  {
    slug: "design-concepts",
    code: "04",
    title: "Design Concepts",
    short: "Design Concepts",
    summary:
      "Design concepts explore possible approaches to meeting the solution requirements for the Advanced Multi-Sensing Mobility System. This document presents and justifies design options, trade-offs, and conceptual solutions that inform the prototype and final product development.",
    docId: "1qMDeOl_mANzAF4QxUAS97axsFNMDlt2e8necap8w-lc",
  },
  {
    slug: "stem-design-viability",
    code: "05",
    title: "Application of STEM Principles and Consideration of Design Viability",
    short: "STEM & Viability",
    summary:
      "This document applies STEM (Science, Technology, Engineering, and Mathematics) principles and practices to the Advanced Multi-Sensing Mobility System and considers the viability of the design. It connects the project to core engineering and scientific methods and evaluates how the solution holds up under real-world constraints and criteria.",
    docId: "1jji2BfSywQFdpyOn_dFVmvy8EST1tJ1Z3RMIJscSTbs",
  },
  {
    slug: "testable-prototype",
    code: "06",
    title: "Construction of a Testable Prototype",
    short: "Prototype Build",
    summary:
      "This document covers the construction of a testable prototype for the Advanced Multi-Sensing Mobility System. It details how the design concepts are implemented into a physical prototype that can be evaluated and refined through testing.",
    docId: "1q-rpXOas-05PlYw5fz0fzbiOnMXdEde20rfrnkDLvz4",
  },
  {
    slug: "prototype-testing",
    code: "07",
    title: "Prototype Testing and Data Collection Plan",
    short: "Testing Plan",
    summary:
      "This plan defines design specifications for the visual aid glasses and the testing criteria used to validate the prototype: environmental reliability, obstacle detection, and user feedback and interface testing, with pass/fail criteria, materials, safety considerations, and data collection tables.",
    docId: "1Arlxrer9aI46gt4N5sbCe4p3lED62NHsA6ZTa472fq0",
  },
  {
    slug: "testing-data-analysis",
    code: "08",
    title: "Testing, Data Collection, and Analysis",
    short: "Data & Analysis",
    summary:
      "This report turns the formal testing plan into evidence: structured trial records, datasheets, and analysis against pass thresholds for environmental reliability (>98% obstacle avoidance under varied lighting and simulated weather), obstacle-type classification with mapped haptic patterns, and user-interface trials for directional vibration and staged low-battery warnings.",
    docId: "1zkPNoUUUbNKTg3AT67J1wY2HgbjB_XPLDHF2OfpVaFA",
  },
];

export const getElement = (slug: string) => elements.find((e) => e.slug === slug)!;

export const NOTEBOOK_URL =
  "https://docs.google.com/document/d/1PhXF3W-L3znEa1InXp31giSMZiSlV1BV2Kv9CXxpEMk/edit?tab=t.bwog6cnzcjxc";
