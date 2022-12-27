#include <iostream>
#include <fstream>

using namespace std;


void load_data( string, int[][2][2], int&, int);

int main()
{
    string input_file = "aoc2021_day5_test_input.txt";
    int MAX_PAIRS = 550;
    int input_pairs[MAX_PAIRS][2][2];
    int input_pairs_length = 0;

    load_data( input_file, input_pairs, input_pairs_length, MAX_PAIRS );

    return 0;
}

void load_data( string input_file, int pair_list[][2][2], int& pair_length, int max_length)
{
    
    ifstream input;
    string data_line;
    int index = 0;
    int coordinate = 0;
    pair_length = 0;

    input.open(input_file);

    while(input && pair_length < max_length)
    {
        coordinate = 0;
        getline(input, data_line);
        

        for( index = 0; data_line[index] != ','; index++)
        {
            coordinate = coordinate * 10 + static_cast<int>(data_line[index] - '0');
        }

        pair_list[pair_length][0][0] = coordinate;
        coordinate = 0;
        index++;
        for(index; data_line[index] != ' '; index++)
        {
            coordinate = coordinate * 10 + static_cast<int>(data_line[index] - '0');
        }

        pair_list[pair_length][0][1] = coordinate;
        coordinate = 0;
        index += 4;

        for(index; data_line[index] != ','; index++)
        {
            coordinate = coordinate * 10 + static_cast<int>(data_line[index] - '0');
        }

        pair_list[pair_length][1][0] = coordinate;
        coordinate = 0;
        index++;

        for(index; index < data_line.length(); index++)
        {
            coordinate = coordinate * 10 + static_cast<int>(data_line[index] - '0');
        }

        pair_list[pair_length][1][1] = coordinate;

        pair_length++;
    }

    input.close();
}