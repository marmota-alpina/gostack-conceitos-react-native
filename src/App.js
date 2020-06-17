import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(repository) {
    // // Implement "Like Repository" functionality
    // const response = await api.post(`repositories/${id}/like`);

    // if(response.status !== 201){
    //   return;
    // }

    // const updatedRepository = response.data;

    // const updatedRepositories = repositories.map(repository=>{
    //   if(repository.id===updatedRepository.id){
    //     return ({...repository, likes: updatedRepository.likes});
    //   }
    //   return repository;
    // });

    // setRepositories(updatedRepositories);
    // Implementação alterada para passar no teste.
    try {
      await api.post(`/repositories/${repository.id}/like`);

      const updatedRepositories = repositories.map((repo) => {
        if (repo.id === repository.id) {
          repo.likes++;
        }
        return repo;
      });

      setRepositories(updatedRepositories);
    } catch (exept) {
      console.log(exept); // eslint-disable-line
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item: repository}) => (
            <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repository.title}</Text>

            <View style={styles.techsContainer}>
              {repository.techs.map((tech, index)=>{
                  return (
                    <Text key={index} style={styles.tech}>
                      {tech}
                    </Text>
                  );
              })}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}, ok
                testID={`repository-likes-${repository.id}`}
              >
                {repository.likes} {repository.likes>1?'curtidas':'curtida'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repository)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}, ok
              testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
          )}
        >
        </FlatList>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
