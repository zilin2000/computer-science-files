# 刷题yyds

> author: Zilin Xu\
> date: 2023.05.25\
> reference: Labuladong, Leetcode, ChatGPT etc.\
> This file records the questions of leetcode questions. The content is divided types of datasturctures and algorithms.

## 目录

- [刷题yyds](#刷题yyds)
  - [目录](#目录)
  - [第一章，基础数据结构](#第一章基础数据结构)
    - [二分搜索](#二分搜索)
      - [34. 在排序数组中查找元素的第一个和最后一个位置](#34-在排序数组中查找元素的第一个和最后一个位置)
      - [704. 二分搜索](#704-二分搜索)
      - [剑指 Offer 53 - I. 在排序数组中查找数字 I](#剑指-offer-53---i-在排序数组中查找数字-i)
      - [35. 搜索插入位置](#35-搜索插入位置)
      - [240. 搜索二维矩阵 II](#240-搜索二维矩阵-ii)

## 第一章，基础数据结构

### 二分搜索

> <https://labuladong.github.io/algo/di-ling-zh-bfe1b/wo-xie-le--3c789/>

#### [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

![截屏2023-05-25 22.34.48.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23fee0f482c947b4a11eff001b5096b2~tplv-k3u1fbpfcp-watermark.image?)

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{left_bound(nums,target),right_bound(nums,target)};        
    }
    //use binary search to find left and right bound of result
    int left_bound(int[] nums, int target){
        int left = 0, right = nums.length-1;
        while(left <= right){
            int mid = left + (right - left) / 2;
            //which means target is in right half area of array
            if(target > nums[mid]){
                left = mid + 1;
            }
            else if(target < nums[mid]){
                right = mid - 1;
            }
            //shrink right window to find most left index
            //如果说，找到了target，但我们的while loop还没结束的话，说明这不是最左边的
            //那么我们就要继续收缩右窗口
            else if(target == nums[mid]){
                right = mid -1;
            }          
        }
                    //check if the left is valid 
            if(left >= nums.lengthnums[left] || != target){
                return -1;
            }
        return left;
    }
    //same as above 
    int right_bound(int[] nums, int target){
        int left = 0, right = nums.length - 1;
        while(left  <= right){
            int mid = left + (right - left)/2;
            if(nums[mid] == target){
                left = mid + 1;
            }
            else if (nums[mid] > target){
                right = mid - 1;
            }
            else if(nums[mid] < target){
                left = mid + 1;
            }
        }
            if (right < 0 || nums[right] != target){
                return -1;
            }
            return right;
    }
}
```

这道题目的要求是在一个排序数组中找到目标值的左右边界。由于数组是排序的，我们可以利用二分查找的思想来解决这个问题。

二分查找算法可以在排序数组中高效地查找目标值，时间复杂度为 O(log n)，其中 n 是数组的长度。这种算法通过反复将查找范围缩小为一半来快速定位目标值。

在这段代码中，我们使用了两次二分查找来找到目标值的左右边界。具体思路如下：

1.  左边界的查找：
    *   使用二分查找方法找到目标值的位置。
    *   如果找到目标值，我们继续向左收缩右边界，直到找到最左边的目标值。
    *   如果最终左边界超出了数组范围或者左边界对应的值不等于目标值，说明数组中不存在目标值，返回 -1。

2.  右边界的查找：
    *   使用二分查找方法找到目标值的位置。
    *   如果找到目标值，我们继续向右收缩左边界，直到找到最右边的目标值。
    *   如果最终右边界越界（小于 0）或者右边界对应的值不等于目标值，说明数组中不存在目标值，返回 -1。

通过这种方法，我们可以找到目标值在排序数组中的左右边界。由于二分查找的时间复杂度较低，这种解决方案具有较好的效率。

> 该解决方案的**时间复杂度是** O(log n)，其中 n 是数组的长度。
> 这是因为解决方案使用了两次二分查找来找到目标值的左右边界。每次二分查找都会将搜索范围缩小一半，因此在最坏情况下，每次二分查找都需要遍历数组的一半，直到找到目标值或者搜索范围为空。所以每次二分查找的时间复杂度是 O(log n)。
> 整体的解决方案包含两次二分查找，因此时间复杂度是 O(log n) + O(log n) = O(log n)。
> 对于**空间复杂度**，该解决方案只使用了常数级别的额外空间，因此空间复杂度是 O(1)。
> 这是因为解决方案并没有使用任何与输入数组大小相关的额外空间。它只使用了一些变量来存储搜索范围的左右边界、中间位置等信息，这些变量的数量是固定的，与输入数组的大小无关。因此，空间复杂度是 O(1)。

#### [704. 二分搜索](https://leetcode.cn/problems/binary-search/)

![截屏2023-05-26 09.08.55.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddc87cf478ff4a28b3daff5f7a6958f6~tplv-k3u1fbpfcp-watermark.image?)

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length -1;
        while(left <= right){
            int mid = left + (right - left)/2;
            if(nums[mid] == target){
                return mid;
            }
            else if (nums[mid] < target){
                left = mid + 1;
            }
            else if(nums[mid] > target){
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

**1、为什么 while 循环的条件中是 <=，而不是 <** ？

答：因为初始化 `right` 的赋值是 `nums.length - 1`，即最后一个元素的索引，而不是 `nums.length`。

这二者可能出现在不同功能的*二分查找*中，区别是：前者相当于两端都闭区间 `[left, right]`，后者相当于左闭右开区间 `[left, right)`。因为索引大小为 `nums.length` 是越界的，所以我们把 `right` 这一边视为开区间。

我们这个算法中使用的是前者 `[left, right]` 两端都闭的区间。**这个区间其实就是每次进行搜索的区间**。

什么时候应该停止搜索呢？当然，找到了目标值的时候可以终止：

        if(nums[mid] == target)
            return mid; 

但如果没找到，就需要 while 循环终止，然后返回 -1。那 while 循环什么时候应该终止？**搜索区间为空的时候应该终止**，意味着你没得找了，就等于没找到嘛。

`while(left <= right)` 的终止条件是 `left == right + 1`，写成区间的形式就是 `[right + 1, right]`，或者带个具体的数字进去 `[3, 2]`，可见**这时候区间为空**，因为没有数字既大于等于 3 又小于等于 2 的吧。所以这时候 while 循环终止是正确的，直接返回 -1 即可。

`while(left < right)` 的终止条件是 `left == right`，写成区间的形式就是 `[right, right]`，或者带个具体的数字进去 `[2, 2]`，**这时候区间非空**，还有一个数 2，但此时 while 循环终止了。也就是说区间 `[2, 2]` 被漏掉了，索引 2 没有被搜索，如果这时候直接返回 -1 就是错误的。

当然，如果你非要用 `while(left < right)` 也可以，我们已经知道了出错的原因，就打个补丁好了：

        //...
        while(left < right) {
            // ...
        }
        return nums[left] == target ? left : -1;

**2、为什么 `left = mid + 1`，`right = mid - 1`？我看有的代码是 `right = mid` 或者 `left = mid`，没有这些加加减减，到底怎么回事，怎么判断**？

答：这也是*二分查找*的一个难点，不过只要你能理解前面的内容，就能够很容易判断。

刚才明确了「搜索区间」这个概念，而且本算法的搜索区间是两端都闭的，即 `[left, right]`。那么当我们发现索引 `mid` 不是要找的 `target` 时，下一步应该去搜索哪里呢？

当然是去搜索区间 `[left, mid-1]` 或者区间 `[mid+1, right]` 对不对？**因为 `mid` 已经搜索过，应该从搜索区间中去除**。

**3、此算法有什么缺陷**？

答：至此，你应该已经掌握了该算法的所有细节，以及这样处理的原因。但是，这个算法存在局限性。

比如说给你有序数组 `nums = [1,2,2,2,3]`，`target` 为 2，此算法返回的索引是 2，没错。但是如果我想得到 `target` 的左侧边界，即索引 1，或者我想得到 `target` 的右侧边界，即索引 3，这样的话此算法是无法处理的。

这样的需求很常见，**你也许会说，找到一个 `target`，然后向左或向右线性搜索不行吗？可以，但是不好，因为这样难以保证*二分查找*对数级的复杂度了**。

我们后续的算法就来讨论这两种*二分查找*的算法。

> TC: O(log n)

#### [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

![截屏2023-05-26 09.55.17.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73d229c8e5bd45e1bed3737d6b5a5751~tplv-k3u1fbpfcp-watermark.image?)

```java
class Solution {
    public int search(int[] nums, int target) {
        //same with 34, find left bound and right bound 
        //get left and right bound
        int left = left_bound(nums, target);
        //if left index is -1, means we didn't  have target in the array
        if(left == -1){
            return 0;
        }
        int right = right_bound(nums,target);
        return right - left + 1;
    }

    int left_bound(int[] nums, int target){
        int left = 0, right = nums.length - 1;
        while(left <= right){
            int mid = left + (right - left)/2;
            if(nums[mid] == target){
                right = mid - 1;
            }
            else if (nums[mid] < target){
                left = mid + 1;
            }
            else if (nums[mid] > target){
                right = mid - 1;
            }

        }
        if(left > nums.length - 1 || nums[left] != target){
            return -1;
        }
        return left;
    }

    int right_bound(int[] nums, int target){
        int left = 0, right = nums.length - 1;
        while(left <= right){
            int mid = left + (right - left)/2;
            if(nums[mid] == target){
                left = mid + 1;
            }
            else if(nums[mid] < target){
                left = mid + 1;
            }
            else if(nums[mid] > target){
                right = mid - 1;
            }
        }
        if(right < 0 || nums[right] != target){
            return -1;
        }
        return right;
    }
}
```

和Leetcode 34 类似，我们先找到`left bound` 和 `right bound`， 在主函数中我们要判断`left bound`是不是 `-1`。

#### [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)

![截屏2023-05-26 10.22.17.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f18674e773714d3fac0d4f64d0802d25~tplv-k3u1fbpfcp-watermark.image?)

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        //找到left bound
        return left_bound(nums, target);
    }

    int left_bound(int[] nums, int target){
        int left = 0, right = nums.length - 1;
        while(left <= right){
            int mid = left + (right - left)/2;
            if (nums[mid] == target){
                right = mid - 1;
            }
            else if(nums[mid] < target){
                left = mid + 1;
            }
            else if(nums[mid] > target){
                right = mid - 1;
            }
        }
        //直接返回
        return left;
    }
}
```

基本思路

这道题就是考察搜索左侧边界的⼆分算法的细节理解，前⽂ ⼆分搜索详解 着重讲了数组中存在⽬标元素重复

的情况，没仔细讲⽬标元素不存在的情况。

当⽬标元素 target 不存在数组 nums 中时，搜索左侧边界的⼆分搜索的返回值可以做以下⼏种解读：

1、返回的这个值是 nums 中⼤于等于 target 的最⼩元素索引。

2、返回的这个值是 target 应该插⼊在 nums 中的索引位置。

3、返回的这个值是 nums 中⼩于 target 的元素个数。

⽐如在有序数组 nums = \[2,3,5,7] 中搜索 target = 4，搜索左边界的⼆分算法会返回 2，你带⼊上⾯

的说法，都是对的。

所以以上三种解读都是等价的，可以根据具体题⽬场景灵活运⽤，显然这⾥我们需要的是第⼆种。

#### [240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

![截屏2023-05-26 17.05.08.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa0c46290708402aa6eeb8b22b09795b~tplv-k3u1fbpfcp-watermark.image?)

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        //binary search，从右上角开始
        int i = 0, j = matrix[0].length -1;
        while(i < matrix.length && j >= 0 ){
            if(matrix[i][j] == target){
                return true;
            }
            if(matrix[i][j] < target){
                i ++;
            }
            else{
                j --;
            }
        }
        return false;
    }
}
```
基本思路

作为 74. 搜索⼆维矩阵，更像 ⼀个⽅法秒杀所有 N 数之和问题，因为它们的思想上有些类似。

这道题说 matrix 从上到下递增，从左到右递增，显然左上⻆是最⼩元素，右下⻆是最⼤元素。我们如果想

⾼效在 matrix 中搜索⼀个元素，肯定需要从某个⻆开始，⽐如说从左上⻆开始，然后每次只能向右或向下

移动，不要⾛回头路。

如果真从左上⻆开始的话，就会发现⽆论向右还是向下⾛，元素⼤⼩都会增加，那么到底向右还是向下？不

确定，那只好⽤类似 动态规划算法 的思路穷举了。

但实际上不⽤这么麻烦，我们不要从左上⻆开始，⽽是从右上⻆开始，规定只能向左或向下移动。

你注意，如果向左移动，元素在减⼩，如果向下移动，元素在增⼤，这样的话我们就可以根据当前位置的元

素和 target 的相对⼤⼩来判断应该往哪移动，不断接近从⽽找到 target 的位置。

>时间复杂度： 在最坏情况下，即当目标值位于矩阵的左下角时，算法的时间复杂度为O(m+n)，其中m为矩阵的行数，n为矩阵的列数。这是因为每次比较都会使得行索引i增加1或列索引j减少1，而最多进行m+n次比较即可找到目标值或确定其不存在。  
空间复杂度： 该算法的空间复杂度为O(1)，因为除了使用常量级别的变量i、j和输入的matrix外，没有使用额外的空间。