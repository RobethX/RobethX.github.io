import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Box, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import Star from 'components/common/Icons/Star';
import Fork from 'components/common/Icons/Fork';
import { Wrapper, Grid, Item, Content, Stats } from './styles';
//import { Star } from '@material-ui/icons';

export const Projects = () => {
  const { themeName } = useContext(ThemeContext);
  const {
    github: {
      viewer: {
        repositories: { edges },
      },
    },
  } = useStaticQuery(
    graphql`
      {
        github {
          viewer {
            repositories(first: 6, orderBy: { field: STARGAZERS, direction: DESC }) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  stargazers {
                    totalCount
                  }
                  forkCount
                }
              }
            }
          }
        }
      }
    `
  );

  return (
    <Wrapper as={Container} id="projects">
      <h2>Projects</h2>
      <Grid>
        {edges.map(({ node }) => (
          <Item key={node.id} as="a" href={node.url} target="_blank" rel="noopener noreferrer" theme={themeName}>
            <Box bgcolor="background.paper" p={"1rem"} height="100%" maxHeight="15rem">
              <Content>
                {/* <Typography variant="h4">{node.name}</Typography> */}
                <h4>{node.name}</h4>
                <p>{node.description}</p>
              </Content>
              <Stats theme={themeName}>
                <div>
                  <Star color={themeName === 'light' ? '#000' : '#fff'} />
                  <span>{node.stargazers.totalCount}</span>
                </div>
                <div>
                  <Fork color={themeName === 'light' ? '#000' : '#fff'} />
                  <span>{node.forkCount}</span>
                </div>
              </Stats>
            </Box>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};
