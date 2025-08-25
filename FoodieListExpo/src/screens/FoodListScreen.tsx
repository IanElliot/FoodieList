import React, { useState } from 'react';
import { 
  ScrollView, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useTheme } from '../theme/ThemeProvider';

interface FoodItem {
  id: string;
  name: string;
  checked: boolean;
}

export const FoodListScreen: React.FC = () => {
  const { colors } = useTheme();
  const [items, setItems] = useState<FoodItem[]>([
    { id: '1', name: 'Chicken breast', checked: false },
    { id: '2', name: 'Pasta', checked: true },
    { id: '3', name: 'Tomatoes', checked: false },
    { id: '4', name: 'Garlic', checked: false },
    { id: '5', name: 'Olive oil', checked: true },
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addItem = () => {
    if (newItem.trim()) {
      const newFood: FoodItem = {
        id: Date.now().toString(),
        name: newItem.trim(),
        checked: false,
      };
      setItems(prev => [newFood, ...prev]);
      setNewItem('');
    }
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setItems(prev => prev.filter(item => item.id !== id))
        },
      ]
    );
  };

  const suggestions = [
    'Fresh basil', 'Parmesan cheese', 'Bell peppers', 'Onions'
  ];

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text size="3xl" weight="bold">Food List</Text>
          <Text variant="secondary" size="lg">
            {items.filter(item => !item.checked).length} items remaining
          </Text>
        </View>

        {/* Add Item Card */}
        <Card style={styles.addCard}>
          <Text size="lg" weight="semibold" style={styles.sectionTitle}>
            Add New Item
          </Text>
          <View style={styles.addItemRow}>
            <TextInput
              style={[styles.input, { 
                borderColor: colors.border.default,
                color: colors.text.primary,
              }]}
              placeholder="Enter food item..."
              placeholderTextColor={colors.text.secondary}
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={addItem}
              returnKeyType="done"
            />
            <Button 
              variant="primary" 
              size="md" 
              onPress={addItem}
              style={styles.addButton}
            >
              Add
            </Button>
          </View>
        </Card>

        {/* Quick Suggestions */}
        <Card style={styles.suggestionsCard}>
          <Text size="lg" weight="semibold" style={styles.sectionTitle}>
            Quick Add
          </Text>
          <View style={styles.suggestionRow}>
            {suggestions.map((suggestion, index) => (
              <Button 
                key={index}
                variant="ghost" 
                size="sm"
                onPress={() => setNewItem(suggestion)}
                style={styles.suggestionButton}
              >
                {suggestion}
              </Button>
            ))}
          </View>
        </Card>

        {/* Items List */}
        <Card style={styles.listCard}>
          <Text size="lg" weight="semibold" style={styles.sectionTitle}>
            Your Items
          </Text>
          
          {items.length === 0 ? (
            <View style={styles.emptyState}>
              <Text variant="secondary" size="lg">
                No items yet. Add some food items above!
              </Text>
            </View>
          ) : (
            <View style={styles.itemsList}>
              {items.map((item) => (
                <View 
                  key={item.id} 
                  style={[
                    styles.itemRow,
                    { borderBottomColor: colors.border.default }
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.itemContent}
                    onPress={() => toggleItem(item.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      { 
                        borderColor: item.checked ? colors.primary.default : colors.border.default,
                        backgroundColor: item.checked ? colors.primary.default : 'transparent'
                      }
                    ]}>
                      {item.checked && (
                        <Text variant="inverse" size="sm" weight="bold">✓</Text>
                      )}
                    </View>
                    <Text 
                      size="base" 
                      style={[
                        styles.itemText,
                        item.checked && styles.checkedText
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={() => deleteItem(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text variant="secondary" size="lg">×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Recipe Suggestions */}
        <Card style={styles.recipesCard}>
          <Text size="lg" weight="semibold" style={styles.sectionTitle}>
            Recipe Suggestions
          </Text>
          <Text variant="secondary" style={styles.recipeHint}>
            Based on your available ingredients
          </Text>
          
          <Button 
            variant="accent" 
            size="lg"
            style={styles.findRecipesButton}
          >
            Find Recipes
          </Button>
        </Card>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  addCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 40,
  },
  addButton: {
    minWidth: 60,
  },
  suggestionsCard: {
    marginBottom: 16,
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionButton: {
    marginBottom: 4,
  },
  listCard: {
    marginBottom: 16,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  itemsList: {
    gap: 0,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  recipesCard: {
    marginBottom: 32,
  },
  recipeHint: {
    marginBottom: 16,
  },
  findRecipesButton: {
    width: '100%',
  },
});

export default FoodListScreen;
