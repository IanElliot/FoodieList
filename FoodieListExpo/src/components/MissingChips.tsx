import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MissingChips({ items }: { items: string[] }) {
  return (
    <View style={styles.wrap}>
      {items.map((m) => (
        <View key={m} style={styles.chip}><Text style={styles.chipText}>{m}</Text></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: 'rgba(0,0,0,0.08)', marginRight: 8, marginBottom: 8 },
  chipText: { fontSize: 13 }
});
