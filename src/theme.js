import { applyTheme } from "@cloudscape-design/components/theming";

const theme = {
  tokens: {
    // Typography - increase sizes proportionally
    fontSizeDisplayL: "48px", // default: 42px
    fontSizeHeadingXl: "32px", // default: 24px (h1)
    fontSizeHeadingL: "26px", // default: 20px (h2)
    fontSizeHeadingM: "24px", // default: 18px (h3)
    fontSizeHeadingS: "22px", // default: 16px (h4)
    fontSizeHeadingXs: "18px", // default: 14px (h5)
    fontSizeBodyM: "16px", // default: 14px
    fontSizeBodyS: "14px", // default: 12px
    lineHeightHeadingXl: "38px", // default: 24px (h1)
    lineHeightHeadingL: "30px", // default: 20px (h2)
    lineHeightHeadingM: "28px", // default: 18px (h3)
    lineHeightHeadingS: "26px", // default: 16px (h4)
    lineHeightHeadingXs: "22px", // default: 14px (h5)

    // Backgrounds
    colorBackgroundLayoutMain: {
      light: "#FFFFFF",
      dark: "#0f1b2a",
    },
    colorBackgroundContainerContent: {
      light: "#FFFFFF",
      dark: "#192534",
    },
    colorBackgroundContainerHeader: {
      light: "#F5F7F9",
      dark: "#1a2738",
    },

    // Primary Brand Colors (Navy Blue - lightened for dark mode visibility)
    colorBorderButtonNormalDefault: {
      light: "#003366",
      dark: "#5c9ce6",
    },
    colorBackgroundButtonPrimaryDefault: {
      light: "#003366",
      dark: "#4a90d9",
    },
    colorBackgroundButtonPrimaryHover: {
      light: "#002855",
      dark: "#5c9ce6",
    },
    colorBackgroundButtonPrimaryActive: {
      light: "#001a33",
      dark: "#3a7fc8",
    },
    colorTextButtonPrimaryDefault: {
      light: "#FFFFFF",
      dark: "#0f1b2a",
    },
    colorTextLinkDefault: {
      light: "#003366",
      dark: "#6ba8e8",
    },
    colorTextLinkHover: {
      light: "#002855",
      dark: "#8fbfef",
    },

    // Interactive Elements
    colorBorderItemSelected: {
      light: "#003366",
      dark: "#5c9ce6",
    },
    colorBackgroundItemSelected: {
      light: "#E8EFF5",
      dark: "#253547",
    },
    colorTextAccent: {
      light: "#003366",
      dark: "#6ba8e8",
    },

    // Success/Positive (Green - brightened for dark mode)
    colorTextStatusSuccess: {
      light: "#5A8F35",
      dark: "#8BC34A",
    },
    colorBackgroundStatusSuccess: {
      light: "#F1F8E9",
      dark: "#1e2e1a",
    },
    colorBorderStatusSuccess: {
      light: "#7CB342",
      dark: "#8BC34A",
    },
    colorTextButtonNormalDefault: {
      light: "#5A8F35",
      dark: "#8BC34A",
    },

    // Warning/Info (Orange - works well in both modes)
    colorTextStatusWarning: {
      light: "#E68900",
      dark: "#FFA726",
    },
    colorBackgroundStatusWarning: {
      light: "#FFF3E0",
      dark: "#332611",
    },
    colorBorderStatusWarning: {
      light: "#FF9800",
      dark: "#FFA726",
    },

    // Error (Red - adjusted for dark mode)
    colorTextStatusError: {
      light: "#D13212",
      dark: "#FF6B6B",
    },
    colorBackgroundStatusError: {
      light: "#FEF0EE",
      dark: "#2e1a1a",
    },
    colorBorderStatusError: {
      light: "#D91515",
      dark: "#FF6B6B",
    },

    // Text
    colorTextBodyDefault: {
      light: "#1a1a1a",
      dark: "#e9ebed",
    },
    colorTextBodySecondary: {
      light: "#5F6B7A",
      dark: "#a4b0be",
    },
    colorTextHeadingDefault: {
      light: "#1a1a1a",
      dark: "#e9ebed",
    },

    // Borders & Dividers
    colorBorderDividerDefault: {
      light: "#E9EBED",
      dark: "#354150",
    },
    colorBorderInputDefault: {
      light: "#AAB7B8",
      dark: "#5f6b7a",
    },

    // Navigation & Header
    colorBackgroundHomeHeader: {
      light: "#003366",
      dark: "#0f1b2a",
    },
    colorTextHomeHeaderDefault: {
      light: "#003366",
      dark: "#e9ebed",
    },
    colorTextHomeHeaderSecondary: {
      light: "#FFA726",
      dark: "#FFA726",
    },
  },
  contexts: {
    "top-navigation": {
      tokens: {
        colorBackgroundContainerContent: {
          light: "#002855",
          dark: "#0a1929",
        },
        colorTextTopNavigationTitle: "#dedee3",
        colorTextAccent: "#f9f9fa",

        fontSizeHeadingM: "18px",
      },
    },
  },
};

export function applyCustomTheme() {
  const { reset } = applyTheme({ theme });
  return reset;
}
