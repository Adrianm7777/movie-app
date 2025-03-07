import { Box, Flex } from "@chakra-ui/react";
import { Provider } from "./components/providers/Provider";
import { Metadata } from "next";
import "../app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "DailyHub",
  description: "Discover the latest movies and TV shows on DailyHub",
  openGraph: {
    type: "website",
    description: "Discover the latest movies and TV shows on DailyHub",
    locale: "pl_PL",
    url: "http://localhost:3000/",
    siteName: "DailyHub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // https://chakra-ui.com/docs/get-started/frameworks/next-app#setup-provider
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="h-100vh w-100vw">
        <Provider>
          <Flex>
            <Box w="100vw">{children}</Box>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
