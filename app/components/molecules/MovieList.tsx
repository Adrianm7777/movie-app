"use client";

import { MovieCard } from "../atoms/MovieCard";
import { motion } from "framer-motion";
import { SimpleGrid } from "@chakra-ui/react";

interface IMovieListProps {
  movies: IMovie[];
}
const MovieList = ({ movies }: IMovieListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
        maxW="7xl"
        mx="auto"
        gap={4}
      >
        {movies?.map((movie, index) => (
          <MovieCard key={movie?.id} movie={movie} index={index} />
        ))}
      </SimpleGrid>
    </motion.div>
  );
};

export default MovieList;
