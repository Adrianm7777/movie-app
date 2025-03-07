"use client";

import { Box, Text, VStack, IconButton, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchMovieGenres } from "../../../lib/api";
import { NAVITEMS } from "../../../lib/data";

interface SidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchMovieGenres();
        setGenres(genresData?.genres || []);
      } catch (err) {
        console.error("Error loading genres:", err);
      }
    };

    loadGenres();
  }, []);

  return (
    <Box
      w={{ base: "100vw", lg: "250px" }}
      bg="gray.800"
      p={4}
      h="100vh"
      position="fixed"
      left={{ base: isOpen ? "0" : "-100vw", lg: "0" }}
      top={0}
      borderRight="1px solid"
      borderColor="gray.700"
      transition="left 0.3s ease-in-out"
      zIndex={10}
      display={{ base: "block", lg: "block" }}
    >
      <VStack align={{ base: "center", lg: "start" }} h="full" w="full">
        <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
          DailyHub
        </Text>
        <VStack align={{ base: "center", lg: "start" }} w="full">
          {NAVITEMS.map((item) => (
            <Link href={item.href} key={item.label} width="full">
              <IconButton
                key={item.label}
                aria-label={item.ariaLabel}
                variant="ghost"
                color="white"
                _hover={{ bg: "gray.700" }}
                w="full"
                pl={{ base: 0, lg: 2 }}
                justifyContent={{ base: "center", lg: "flex-start" }}
              >
                {item.label}
              </IconButton>
            </Link>
          ))}
        </VStack>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="white"
          mt={6}
          textDecoration="underline"
        >
          Genres
        </Text>
        <VStack
          align={{ base: "center", lg: "start" }}
          w="full"
          overflowY="auto"
          maxH={{ base: "100vh", lg: "50vh" }}
        >
          {genres.map((genre) => (
            <IconButton
              key={genre.id}
              aria-label={genre.name}
              variant="ghost"
              color="gray.300"
              _hover={{ bg: "gray.700", color: "white" }}
              w="full"
              pl={{ base: 0, lg: 2 }}
              justifyContent={{ base: "center", lg: "flex-start" }}
              onClick={() => (window.location.href = `/?genre=${genre.id}`)}
            >
              {genre.name}
            </IconButton>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
