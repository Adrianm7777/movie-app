"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Badge,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense, lazy } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

const Sidebar = lazy(() => import("../organisms/Sidebar"));

interface IMovieDetailsPage {
  movie: IMovie | null;
}

export const MovieDetailsPage = ({ movie }: IMovieDetailsPage) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      </Suspense>
      <Container
        maxW="100vw"
        py={12}
        minH="100vh"
        bg="gray.900"
        color="white"
        pl={{ base: "10px", lg: "280px" }}
        pr={{ base: "10px", lg: "30px" }}
      >
        <Flex direction="column" align="center" gap={6}>
          <Icon
            as={GiHamburgerMenu}
            aria-label="Menu"
            fontSize="40px"
            display={{ base: "block", lg: "none" }}
            position="absolute"
            top={4}
            right={4}
            zIndex={20}
            onClick={toggleSidebar}
            color="white"
          />
          <Box width="100%">
            <Link href="/" prefetch={true}>
              <Button colorScheme="brand" variant="solid" borderRadius={8}>
                ← Back to movies
              </Button>
            </Link>
          </Box>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={8}
            bg="gray.800"
            p={6}
            borderRadius={12}
            boxShadow="2xl"
          >
            <Box flexShrink={0}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title || "movie poster"}
                width={300}
                height={450}
                priority
                style={{ borderRadius: "12px" }}
              />
            </Box>
            <Box flex="1">
              <Heading as="h1" size="2xl" mb={4}>
                {movie?.title}
              </Heading>
              <Flex align="center" mb={4}>
                <Badge
                  colorScheme="yellow"
                  fontSize="lg"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  IMDb {movie?.vote_average.toFixed(1)}
                </Badge>
              </Flex>
              <Text fontSize="lg" mb={4}>
                {movie?.release_date}
              </Text>
              <Text fontSize="md" opacity={0.9} lineHeight="tall">
                {movie?.overview}
              </Text>
              <Button mt={6} colorScheme="brand" size="lg" borderRadius={8}>
                ▶ WATCH TRAILER
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
