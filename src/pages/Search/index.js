import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert
} from 'react-native'

import api from '../../services/api'
import { Feather } from '@expo/vector-icons'
import PostItem from '../../components/PostItem'

export default function Search() {
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  const [empty, setEmpty] = useState(false)

  async function handleSearchPost() {
    if (input === '') {
      Alert.alert('Ops', 'Digite o que você está procurando...', [
        { text: 'OK', onPress: () => {} }
      ])
      return
    }

    const response = await api.get(
      `api/posts?filters[title][$containsi]=${input}&populate=cover`
    )

    //quando buscar e Não encontrar nada
    if (response.data?.data.length === 0) {
      setEmpty(true)
      setPosts([])
      return
    }

    setPosts(response.data?.data)
    setEmpty(false)
    setInput('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          value={input}
          onChangeText={text => setInput(text)}
          style={styles.input}
          placeholder="O que está procurando?"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPost}
        >
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      {empty && (
        <View>
          <Text style={styles.emptyText}>
            Ops não encontramos nenhum post...
          </Text>
        </View>
      )}

      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 18
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  input: {
    width: '85%',
    backgroundColor: '#C4C4C4',
    height: 45,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    fontSize: 16
  },
  searchButton: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    height: 45,
    borderTopRightRadiusRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -1
  },
  emptyText: {
    textAlign: 'center'
  }
})
