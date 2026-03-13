#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file;
    char ch;

    file = fopen("example.txt", "r");
    if (file == NULL) {
        printf("Failed to open file.\n");
        return 1;
    }

    printf("The content of the file is being displayed:\n");
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }

    fclose(file);
    return 0;
}