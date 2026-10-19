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
    code: "A",
    title: "Problem Statement",
    short: "Problem",
    summary:
      "Visually impaired people face a high risk of serious injury from falls during daily mobility in various indoor and outdoor environments. This is primarily because current aids like canes don't reliably detect or warn users about steep drop-offs or overhanging obstacles. With 46.7% of visually impaired individuals reporting a fall each year, leading to injury and loss of independence, a more reliable solution is urgently needed to ensure their safety and mobility.",
    docId: "1nm1oX55O9p0G8aLkooEbWzQwoYrnzbnvmzzwNl3oMaY",
  },
  {
    slug: "patents-products",
    code: "B",
    title: "Relevant Patents and Products",
    short: "Patents & Products",
    summary:
      "This report evaluates both existing patents and commercially available products, ranging from complex intelligent glasses and feature-rich smart canes to innovative wearable sensory substitution prototypes, to analyze the current landscape of solutions related to the problem statement. The evaluation of these solutions focuses specifically on the effectiveness of their sensor technology (ultrasonic, infrared, and camera) in accurately detecting high-risk hazards like steep drop-offs and overhanging obstacles. By identifying technological gaps, looking at the trade-off between reliability, high cost, and user-friendliness of the solutions, the analysis can determine the optimal foundation for a new solution necessary to ensure enhanced safety and independent mobility for the visually impaired.",
    docId: "1KepUWubciquNzvAXxOPvQaQIoPt3xEXZKqPGH-nvKA8",
  },
  {
    slug: "solution-requirements",
    code: "C",
    title: "Solution Requirements",
    short: "Requirements",
    summary:
      "Feedback from experts in the field of visual aid devices, devices using different types of sensors, and stakeholders such as visually impaired people, caretakers, and legislators of ADA was crucial to determine the design specifications. A significant amount of research of already existing devices, designs, and patents was required to create the specifications and order them from most important to least. All of this, along with examining the pros and cons of each product, was used to determine the specifications for the prototype.",
    docId: "14K9fGDC_6G561sUzqFl-jEDLfIa93KMdqy5EJc0d9zA",
  },
  {
    slug: "design-concepts",
    code: "D",
    title: "Design Concepts",
    short: "Design Concepts",
    summary:
      "Design concepts explore possible approaches to meeting the solution requirements for the Advanced Multi-Sensing Mobility System. This document presents and justifies design options, trade-offs, and conceptual solutions that inform the prototype and final product development.",
    docId: "1nb--DwcDpTBWtnDxnagfR2bt-f4U9sKa_s-BmcNgqdI",
  },
  {
    slug: "stem-design-viability",
    code: "E&F",
    title: "Application of STEM Principles and Consideration of Design Viability",
    short: "STEM & Viability",
    summary:
      "This document applies STEM (Science, Technology, Engineering, and Mathematics) principles and practices to the Advanced Multi-Sensing Mobility System and considers the viability of the design. It connects the project to core engineering and scientific methods and evaluates how the solution holds up under real-world constraints and criteria.",
    docId: "1JIk2YQjSZsYI2tXsqUnstpTkpzYXEZeNX9XKw7cjTrE",
  },
  {
    slug: "testable-prototype",
    code: "G",
    title: "Construction of a Testable Prototype",
    short: "Prototype Build",
    summary:
      "This document covers the construction of a testable prototype for the Advanced Multi-Sensing Mobility System. It details how the design concepts are implemented into a physical prototype that can be evaluated and refined through testing.",
    docId: "1ViC7-2yoUyv-H75sicIZmfjYF0OvFDQEJFVwTT7R31g",
  },
  {
    slug: "prototype-testing",
    code: "H",
    title: "Prototype Testing and Data Collection Plan",
    short: "Testing Plan",
    summary:
      "This plan defines design specifications for the visual aid glasses and the testing criteria used to validate the prototype: environmental reliability, obstacle detection, and user feedback and interface testing, with pass/fail criteria, materials, safety considerations, and data collection tables.",
    docId: "1iYztj8ZwxfRffA-24elcq9f9z09Vq-rolJarJQhMxZU",
  },
  {
    slug: "testing-data-analysis",
    code: "I",
    title: "Testing, Data Collection, and Analysis",
    short: "Data & Analysis",
    summary:
      "This report turns the formal testing plan into evidence: structured trial records, datasheets, and analysis against pass thresholds for environmental reliability (>98% obstacle avoidance under varied lighting and simulated weather), obstacle-type classification with mapped haptic patterns, and user-interface trials for directional vibration and staged low-battery warnings.",
    docId: "1f54fikth2vUbI8lxopFks6KaTbC0oCLgL-k20FRLxV4",
  },
];

export const getElement = (slug: string) => elements.find((e) => e.slug === slug)!;


export const docUrl = (docId: string) => `https://docs.google.com/document/d/${docId}/edit`;
