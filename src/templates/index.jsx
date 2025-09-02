// Template registry and configuration
export const templates = [
  {
    id: 1,
    name_ku: "مۆدێرن",
    name_en: "Modern",
    name_ar: "حديث",
    category: "پیشەیی",
    category_en: "Professional",
    preview_url: "/templates/modern-preview.svg",
    template_data: {
      layout: "modern",
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#f59e0b",
        background: "#ffffff",
        text: "#1f2937"
      },
      fonts: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      spacing: {
        sectionGap: "2rem",
        elementGap: "0.75rem"
      },
      borderRadius: "0.5rem"
    }
  },
  {
    id: 2,
    name_ku: "کلاسیک",
    name_en: "Classic",
    name_ar: "كلاسيكي",
    category: "رەسمی",
    category_en: "Formal",
    preview_url: "/templates/classic-preview.svg",
    template_data: {
      layout: "classic",
      colors: {
        primary: "#1f2937",
        secondary: "#6b7280",
        accent: "#374151",
        background: "#ffffff",
        text: "#111827"
      },
      fonts: {
        heading: "Times New Roman, serif",
        body: "Times New Roman, serif"
      },
      spacing: {
        sectionGap: "2rem",
        elementGap: "0.75rem"
      },
      borderRadius: "0.25rem"
    }
  },
  {
    id: 3,
    name_ku: "هونەری",
    name_en: "Creative",
    name_ar: "إبداعي",
    category: "هونەری",
    category_en: "Creative",
    preview_url: "/templates/creative-preview.svg",
    template_data: {
      layout: "creative",
      colors: {
        primary: "#8b5cf6",
        secondary: "#ec4899",
        accent: "#06b6d4",
        background: "#ffffff",
        text: "#1f2937"
      },
      fonts: {
        heading: "Poppins, sans-serif",
        body: "Poppins, sans-serif"
      },
      spacing: {
        sectionGap: "2.5rem",
        elementGap: "1rem"
      },
      borderRadius: "1rem"
    }
  },
  {
    id: 4,
    name_ku: "سادە",
    name_en: "Minimal",
    name_ar: "بسيط",
    category: "سادە",
    category_en: "Minimal",
    preview_url: "/templates/minimal-preview.svg",
    template_data: {
      layout: "minimal",
      colors: {
        primary: "#000000",
        secondary: "#666666",
        accent: "#cccccc",
        background: "#ffffff",
        text: "#333333"
      },
      fonts: {
        heading: "Helvetica, sans-serif",
        body: "Helvetica, sans-serif"
      },
      spacing: {
        sectionGap: "2rem",
        elementGap: "0.75rem"
      },
      borderRadius: "0.25rem"
    }
  }
];

// Template renderer function with lazy loading
export function renderTemplate(templateId, cvData) {
  const template = templates.find(t => t.id === templateId);
  if (!template) return null;

  const TemplateComponent = getTemplateComponent(template.template_data.layout);
  return TemplateComponent ? <TemplateComponent cvData={cvData} config={template.template_data} /> : null;
}

// Lazy load template components
let ModernTemplate, ClassicTemplate, CreativeTemplate, MinimalTemplate;

const loadTemplates = async () => {
  if (!ModernTemplate) {
    const [
      ModernModule,
      ClassicModule,
      CreativeModule,
      MinimalModule
    ] = await Promise.all([
      import('./layouts/ModernTemplate.jsx'),
      import('./layouts/ClassicTemplate.jsx'),
      import('./layouts/CreativeTemplate.jsx'),
      import('./layouts/MinimalTemplate.jsx')
    ]);

    ModernTemplate = ModernModule.default;
    ClassicTemplate = ClassicModule.default;
    CreativeTemplate = CreativeModule.default;
    MinimalTemplate = MinimalModule.default;
  }
};

// Initialize templates on first render
if (typeof window !== 'undefined') {
  loadTemplates();
}

// Get template component by layout type (with lazy loading check)
function getTemplateComponent(layout) {
  // If templates aren't loaded yet, trigger loading
  if (!ModernTemplate) {
    loadTemplates();
    return null; // Return null while loading
  }

  switch (layout) {
    case 'modern':
      return ModernTemplate;
    case 'classic':
      return ClassicTemplate;
    case 'creative':
      return CreativeTemplate;
    case 'minimal':
      return MinimalTemplate;
    default:
      return ModernTemplate;
  }
}

// Template components are lazy loaded above
