import { Flex, Image, Box, Stack, Input, Button, Grid } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchEbooks, selectEbooks } from './itunesSlice';

function stripHtml(html: string) {
  var tmp = document.implementation.createHTMLDocument('New').body;
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function ITunes() {
  const dispatch = useDispatch();
  const ebooks = useSelector(selectEbooks);
  const [searchTerm, setSearchTerm] = useState('');

  const even = ebooks.filter((item, index) => {
    return index % 2 === 0;
  });

  const odd = ebooks.filter((item, index) => {
    return index % 2 !== 0;
  });

  const renderEbook = (ebook) => (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      marginBottom="12px"
      marginTop="12px"
      minHeight="300px"
      overflow="hidden"
      key={ebook.trackId}
    >
      <Grid templateColumns="1fr 2fr" gap={1}>
        <Box>
          <Image
            height="100%"
            maxHeight="200px"
            src={ebook.artworkUrl100}
            alt="movie artwork"
          />
          <Box>{ebook.formattedPrice}</Box>
          <Box d="flex" mt="2">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  w={6}
                  h={6}
                  color={i < ebook.averageUserRating ? 'teal.500' : 'gray.300'}
                />
              ))}
          </Box>
        </Box>
        <Box alignItems="left">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            fontSize="16px"
            isTruncated
          >
            {ebook.trackName}
          </Box>
          <Box mt="1" as="h5" fontSize="14px" lineHeight="tight" noOfLines={25}>
            {unescape(stripHtml(ebook.description))}
          </Box>
        </Box>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Stack direction="row">
        <Input
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
        <Button
          colorScheme="blue"
          onClick={() => dispatch(searchEbooks({ searchTerm }))}
        >
          Search
        </Button>
      </Stack>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Flex color="white" direction="column">
          {even.map((ebook) => renderEbook(ebook))}
        </Flex>
        <Flex color="white" direction="column">
          {odd.map((ebook) => renderEbook(ebook))}
        </Flex>
      </Grid>
    </Box>
  );
}
