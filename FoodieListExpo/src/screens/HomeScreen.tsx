import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Linking,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useStore from "../store";
import MissingChips from "../components/MissingChips";

export default function HomeScreen() {
  const {
    items,
    suggestions,
    loading,
    error,
    add,
    toggle,
    remove,
    addMissing,
  } = useStore();
  const [text, setText] = useState("");

  console.log(items);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TextInput
          placeholder="Add item (e.g. pasta, lemon)"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button
          title="Add"
          onPress={async () => {
            await add(text);
            setText("");
          }}
        />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 8 }} />}
      {error && (
        <Text style={{ color: "red", marginHorizontal: 16 }}>{error}</Text>
      )}

      <FlatList
        ListHeaderComponent={<Text style={styles.sectionTitle}>Your List</Text>}
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable onPress={() => toggle(item)} style={styles.checkbox}>
              <Text style={{ fontSize: 20 }}>
                {item.checked ? "✅" : "⭕️"}
              </Text>
            </Pressable>
            <Text
              style={[styles.rowText, item.checked && styles.rowTextChecked]}
            >
              {item.nameRaw}
            </Text>
            <Pressable onPress={() => remove(item)} style={styles.deleteBtn}>
              <Text>🗑️</Text>
            </Pressable>
          </View>
        )}
        ListFooterComponent={
          <View
            style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 64 }}
          >
            {suggestions.length > 0 && (
              <Text style={styles.sectionTitle}>You're 1–3 items away</Text>
            )}
            {suggestions.map((s) => (
              <View key={s.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  {typeof s.timeMin === "number" && (
                    <Text style={styles.cardMeta}>{s.timeMin} min</Text>
                  )}
                </View>
                <Text style={styles.cardMeta}>
                  You have {s.haveCount}/{s.total}
                </Text>
                <MissingChips items={s.missing} />
                <View style={styles.cardActions}>
                  <Button title="Add missing" onPress={() => addMissing(s)} />
                  {!!s.sourceUrl && (
                    <Button
                      title="View recipe"
                      onPress={() => Linking.openURL(s.sourceUrl!)}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", gap: 8, padding: 16 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  checkbox: { width: 32 },
  rowText: { flex: 1, fontSize: 16 },
  rowTextChecked: { textDecorationLine: "line-through", color: "#999" },
  deleteBtn: { paddingHorizontal: 8 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    borderColor: "#eee",
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardMeta: { color: "#666", marginTop: 4 },
  cardActions: { flexDirection: "row", gap: 12, marginTop: 10 },
});
