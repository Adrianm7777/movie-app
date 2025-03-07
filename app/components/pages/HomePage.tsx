"use client";

import { Container, Flex, Heading, Text, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { NativeSelect } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

const Sidebar = lazy(() => import("../organisms/Sidebar"));
const MovieList = lazy(() => import("../molecules/MovieList"));

interface IHomePageProps {
  movies?: IMovie[];
}

export const HomePage = ({ movies }: IHomePageProps) => {
  const [sortBy, setSortBy] = useState<
    "title.desc" | "release_date.desc" | "vote_average.desc"
  >("release_date.desc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    const sortFromUrl = searchParams.get("sort");
    if (
      sortFromUrl &&
      ["title.desc", "release_date.desc", "vote_average.desc"].includes(
        sortFromUrl
      )
    ) {
      setSortBy(
        sortFromUrl as "title.desc" | "release_date.desc" | "vote_average.desc"
      );
    }
  }, [searchParams]);

  const genreParam = searchParams.get("genre");
  const genreId = genreParam ? parseInt(genreParam, 10) : undefined;
  const filteredMovies = genreId
    ? movies?.filter((movie) => movie?.genre_ids?.includes(genreId))
    : movies;

  const sortedMovies = [...(filteredMovies || [])].sort((a, b) => {
    switch (sortBy) {
      case "title.desc":
        return b.title.localeCompare(a.title);
      case "vote_average.desc":
        return b.vote_average - a.vote_average;
      case "release_date.desc":
      default:
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
    }
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as
      | "title.desc"
      | "release_date.desc"
      | "vote_average.desc";
    setSortBy(newSort);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", newSort);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      </Suspense>
      <Container
        minW="100%"
        py={16}
        bg="gray.900"
        minH="100vh"
        pl={{ base: "10px", lg: "280px" }}
        pr={{ base: "10px", lg: "30px" }}
      >
        <Flex direction="column" align="center" gap={12}>
          <Icon
            as={GiHamburgerMenu}
            aria-label="Open sidebar menu"
            fontSize="40px"
            display={{ base: "block", lg: "none" }}
            position="absolute"
            top={4}
            right={4}
            zIndex={20}
            onClick={toggleSidebar}
            color="white"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h1"
              size="4xl"
              color="white"
              textAlign="center"
              mb={8}
              textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
            >
              DailyHub
            </Heading>
            <Text fontSize="xl" color="gray.300" textAlign="center">
              Discover the latest movies and TV shows
            </Text>
          </motion.div>

          <Flex w="full" justify="flex-end" align="end">
            <NativeSelect.Root width="320px" colorPalette="white">
              <NativeSelect.Field
                color="white"
                as="select"
                aria-label="Sort movies"
                value={sortBy}
                onChange={handleSortChange}
                borderRadius={8}
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _focus={{ boxShadow: "outline", borderColor: "brand.500" }}
                transition="all 0.3s"
              >
                <option value="release_date.desc">Sort by Release Date</option>
                <option value="title.desc">Sort by Title</option>
                <option value="vote_average.desc">Sort by Rating</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>
          <Suspense fallback={<LoadingSpinner />}>
            <MovieList movies={sortedMovies} />
          </Suspense>
        </Flex>
      </Container>
    </>
  );
};
