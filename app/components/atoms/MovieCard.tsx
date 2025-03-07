"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";

interface IMovieCardProps {
  movie: IMovie;
  index: number;
}

export const MovieCard = ({ movie, index }: IMovieCardProps) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const defaultImageUrl = "/image-placeholder.webp";
  const imageSrc = movie.poster_path
    ? `${baseImageUrl}${movie.poster_path}`
    : defaultImageUrl;

  return (
    <article>
      <Link href={`/movie/${movie?.id}`} prefetch={true}>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            bg="gray.800"
            borderRadius={12}
            overflow="hidden"
            boxShadow="md"
            _hover={{ boxShadow: "xl" }}
            transition="all 0.3s"
            w="100%"
          >
            <Box position="relative" w="100%" pt="150%">
              <Image
                src={imageSrc}
                alt={`${movie?.title} movie poster`}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                }}
                priority={index < 4}
                loading={index > 3 ? "lazy" : "eager"}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+/ahAQI8A/kwLgO8AAAAAElFTkSuQmCC"
              />
            </Box>
            <Box p={4} textAlign={{ base: "center", lg: "left" }}>
              <Text
                as="h3"
                fontSize="md"
                fontWeight="bold"
                color="white"
                mb={1}
                truncate
              >
                {movie?.title}
              </Text>
              <Text fontSize="sm" color="gray.300" fontWeight="semibold">
                Release Date: {movie?.release_date}
              </Text>
            </Box>
          </Box>
        </motion.div>
      </Link>
    </article>
  );
};
